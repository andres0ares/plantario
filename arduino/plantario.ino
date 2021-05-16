#include <ESP8266WiFi.h>
#include <WiFiClientSecure.h>
#include <ArduinoJson.h>
#include <stdio.h>
#include <string.h>

#ifndef STASSID
#define STASSID "********"  //nome do wifi
#define STAPSK  "********"  //senha wifi    
#define LED 13   
#endif

const char* ssid = STASSID;
const char* password = STAPSK;
const char* host = "plantario.oandre.com";
const int httpsPort = 443;
const char fingerprint[] PROGMEM = "ccd3380ed0c69d741c8b01d6d0c91ad6526ff1e3";


int ilu = 5;
int umi = 60;
int temp = 29;
int reservatorio = 70;


void setup() {
  // put your setup code here, to run once:

  Serial.begin(9600);
  connectWifi();
}

void loop() {
  // put your main code here, to run repeatedly:
  if (WiFi.status() == WL_CONNECTED) { //Check WiFi connection status

   
    getConfig(); // as variáveis globais temp, umi e ilu serão atualizadas
    
    sendReport(temp - 1, ilu - 1, umi - 1, reservatorio - 1);  // envia os valores da temperatura, iluminacao, umidade, e reservatorio para o banco de dados
    
    delay(10000);

     
  
  }else{
    connectWifi();
  }

}

void connectWifi(){
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print("Connecting..");
  }
}


void getConfig() {
  
      WiFiClientSecure client;
     
      //connectando ao host, usando o fingerprint
      client.setFingerprint(fingerprint);
    
      if (!client.connect(host, httpsPort)) {
        // coneccao falhou
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
        
        StaticJsonDocument<256> doc;
        DeserializationError err = deserializeJson(doc, line);
        
        if(err) { return; }
        Serial.println(line);
        digitalWrite(LED, HIGH);
        delay(3000);
        digitalWrite(LED, LOW);
        delay(1000);
        
        temp = doc["data"]["temp"];
        ilu = doc["data"]["ilu"];
        umi = doc["data"]["umi"];
        } else {
        //esp8266/Arduino CI has failed
      }
}

void sendReport (int temp1, int ilu1, int umi1, int reservatorio1) {

      WiFiClientSecure client;
     
      //connectando ao host, usando o fingerprint
      client.setFingerprint(fingerprint);
    
      if (!client.connect(host, httpsPort)) {
        // coneccao falhou
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
