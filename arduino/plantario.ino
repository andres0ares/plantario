#include <ESP8266WiFi.h>
#include <WiFiClientSecure.h>
#include <ArduinoJson.h>
#include <Servo.h>
#include <OneWire.h>
#include <DallasTemperature.h>
#include <stdio.h>
#include <string.h>

// Editar antes de compilar!!!!
#ifndef STASSID
#define STASSID "brisa-1123109"  // nome do wifi
#define STAPSK  "hidiqmzu"       // senha wifi    
#define ILU_SENSOR A0            // pin sensor de luminosidade
#define UMI_SENSOR A1            // pin sensor de umidade do solo
#define NIV_SENSOR 16            // pin sensor de nivel
#define TEM_SENSOR 15            // pin sensor de temperatura
#define SERVO_PIN 14             // pin motor do sombrete
#define BOMBA_PIN 13             // pin da bomba de agua
#define COOLER_PIN 12            // pin do cooler
#endif
// fim Editar antes de compilar

// configuracoes para conexao com o site
const char* ssid = STASSID;
const char* password = STAPSK;
const char* host = "plantario.oandre.com";
const int httpsPort = 443;
const char fingerprint[] PROGMEM = "ccd3380ed0c69d741c8b01d6d0c91ad6526ff1e3";

//variaveis globais
Servo servo;
OneWire oneWire(TEM_SENSOR); //seta o pino usado na func. para comecar as leituras do sensor
DallasTemperature sensor(&oneWire); //passa as inf. lidas do OneWire para o Dallas
int angle = 10;
int luminosidade_value = 0;
int umidade_value = 0;
int status_sombrete = 0;

//variaveis modificadas pela funcao getConfig()
int ilu = 5;
int umi = 60;
int temp = 29;
int openSombrete = 0;

// funcao de configuracao, executada uma vez
void setup() {
  
  servo.attach(SERVO_PIN); // inicia motor
  servo.write(angle); // inicia motor angulo 10

  pinMode(BOMBA_PIN, OUTPUT); // Bomba de agua
  pinMode(COOLER_PIN, OUTPUT); // COOLER_PIN
  pinMode(NIV_SENSOR, INPUT); // sensor de nivel
  sensor.begin(); // temperatura

  Serial.begin(9600);
  connectWifi();

}

// funcao principal, executada repeditamente
void loop() {
  if (WiFi.status() == WL_CONNECTED) { //verifica status da conexao wifi
   
    getConfig(); // as variáveis globais temp, umi, ilu e openSombrete sao atualizadas  

    handleIluminacao(); // controle de exposicao ao sol

    handleTemperatura();  // controle de temperatura

    handleIrrigacao(umi);  // controle da umidade do solo

    sendReport(getTemperatura(), getIluStatus(), getUmiStatus(), getReservatorioStatus());  // envia os valores da temperatura, iluminacao, umidade, e reservatorio para o banco de dados
    
  }else{
    connectWifi(); 
  }

}

/* CONTROLE DE TEMPERATURA */

void handleTemperatura() {

  int valor_temperatura = getTemperatura();

  if(valor_temperatura >= (temp + 2)){
    digitalWrite(COOLER_PIN, HIGH); // liga cooler
  }else if(valor_temperatura <= temp){
    digitalWrite(COOLER_PIN, LOW);  // desliga cooler
  }

}

// funcao da temperatura 
int getTemperatura() {

  sensor.requestTemperatures(); //solicita temperaturas ao sensor
  float temp_valor = sensor.getTempCByIndex(0); //transforma temperatura em Celcius
  Serial.println("Temperatura: ");
  Serial.println(temp_valor);
  return (int) temp_valor;
}

/* CONTROLE DA UMIDADE DO SOLO */

void handleIrrigacao(int umi1) {

  if(getReservatorioStatus() == 0) {

    int sensorUmi = getUmiStatus();

    if( sensorUmi < (umi1 - 10)) { // a bomba e ligada caso a umidade do sensor esteja menor que 10% da configuracao

      int ligaBomba = 1;
      digitalWrite(BOMBA_PIN, HIGH);

      while(ligaBomba) {
        //entra em loop ate atingir a umidade desejada
        Serial.println("Bomba ligada");

        if(getUmiStatus() >= umi1){
          ligaBomba = 0; // sai do loop
          digitalWrite(BOMBA_PIN, LOW);
          Serial.println("Bomba desligada");
        }
      }
    }
  }  
}

int getReservatorioStatus() {

  int nivel = digitalRead(NIV_SENSOR);

  Serial.println("Valor sensor nivel");
  Serial.println(nivel);

  return nivel;
}

int getUmiStatus() {
  
  umidade_value = analogRead(UMI_SENSOR);
  
  //coverte valor do sensor para porcentagem
  float umi_percent1 = 100 - ((((float) umidade_value - 338.00) / 686.00) * 100.00);  // intervalo entre 338  e 1024, sendo 1024 totalmente seco
  Serial.println("porcentagem de umidade ");
  Serial.println(umi_percent1);
  
  return (int) umi_percent1;
}


/* CONTROLE DE EXPOSICAO AO SOL */

void handleIluminacao() {

  if(openSombrete != status_sombrete){
      if(status_sombrete == 0){
        handleSombrete(0); //fecha o sombrete
        status_sombrete = 1;
      }else if(status_sombrete == 1){
        handleSombrete(1); //Abre o sombrete
        status_sombrete = 0;
      }
    }
}

void handleSombrete(int option) {
  // option == 1 - abre o sombrete
  // option == 0 - fecha o sombrete

  switch(option) {
    case 0:
      for(angle = 10; angle < 150; angle++) {                                  
        servo.write(angle);               
        delay(15);                   
      } 
      break;
    case 1:
       for(angle = 150; angle >  10; angle--) {                                
        servo.write(angle);           
        delay(15);       
      } 
      break;
    default:
      break;
  }
}


int getIluStatus() { // captura e retorna valor do sensor LDR

  luminosidade_value = analogRead(ILU_SENSOR);
  Serial.println(luminosidade_value);

  return luminosidade_value;
}


/* WI-FI */

void connectWifi(){
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print("Connecting..");
  }
}


/* CONEXAO COM O SITE */

void getConfig() {

  // #include <WiFiClientSecure.h>
  // #include <ArduinoJson.h>
  
      WiFiClientSecure client;
     
      //conectando ao host, usando o fingerprint
      client.setFingerprint(fingerprint);
    
      if (!client.connect(host, httpsPort)) {
        // conexao falhou
        return;
      }
    
      String url = "/api/command";

      client.print(String("GET ") + url + " HTTP/1.1\r\n" +
               "Host: " + host + "\r\n" +
               "User-Agent: BuildFailureDetectorESP8266\r\n" +
               "Connection: close\r\n\r\n");

      //solicitacao enviada
      
      while (client.connected()) {
        String line = client.readStringUntil('\n');
        if (line == "\r") {
          //headers received
          break;
        }
      }
      
      String line = client.readStringUntil('\n');
      if (line.startsWith("{\"success\":true")) {
        // Recebido dados com sucesso
        
        StaticJsonDocument<384> doc;
        DeserializationError err = deserializeJson(doc, line);
        
        if(err) { return; }
        Serial.println(line);
       
        temp = doc["data"]["temp"];
        ilu = doc["data"]["ilu"];
        umi = doc["data"]["umi"];
        openSombrete = doc["data"]["openSombrete"];
        } else {
        //esp8266/Arduino CI has failed
      }
}

void sendReport (int temp1, int ilu1, int umi1, int reservatorio1) {

      WiFiClientSecure client;
     
      //connectando ao host, usando o fingerprint
      client.setFingerprint(fingerprint);
    
      if (!client.connect(host, httpsPort)) {
        // conexao falhou
        return;
      }
      
      StaticJsonDocument<200> root;
            
      root["temp"] = temp1;
      root["ilu"] = ilu1;
      root["umi"] = umi1;
      root["reservatorio"] = reservatorio1;
      serializeJson(root, Serial);
      
      String url = "/api/report";      
      client.print("POST ");
      client.print(url);
      client.println(" HTTP/1.1");
      client.print("Host: ");
      client.println(host);
      client.println("Connection: close\r\nContent-Type: application/json");
      client.print("Content-Length: ");
      client.print(measureJson(root));
      client.print("\r\n");
      client.println();
      serializeJson(root, client);
      

      //solicitacao enviada
      
      while (client.connected()) {
        String line = client.readStringUntil('\n');
        if (line == "\r") {
          Serial.println(line);
          break;
        }
      }

}