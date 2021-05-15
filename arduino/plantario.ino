#include <ESP8266WiFi.h>
#include <WiFiClientSecure.h>
#include <ArduinoJson.h>
#include <stdio.h>
#include <string.h>

#ifndef STASSID
#define STASSID "brisa-1123109"  //nome do wifi
#define STAPSK  "hidiqmzu"  //senha wifi    
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

void sendReport () {

WiFiClientSecure client;
     
      //connectando ao host, usando o fingerprint
      client.setFingerprint(fingerprint);
    
      if (!client.connect(host, httpsPort)) {
        // coneccao falhou
        return;
      }

      int temp1 = 26;
      int ilu1 = 4;
      int umi1 = 57;
      int reservatorio1 = 65;

      char *body = "{\"temp\": 21, \"ilu\": 3, \"umi\": 56, \"reservatorio\": 77}";
      
      // "{\"temp\": " + String(temp1) + ", \"ilu\": " + String(ilu1) + ", \"umi\": " + String(umi1) + ", \"reservatorio\": " + String(reservatorio1) + "}"
      // "{\"temp\": 21, \"ilu\": 3, \"umi\": 56, \"reservatorio\": 77}" 
      // "{"temp": 21, "ilu": 3, "umi": 56, "reservatorio": 77}" 

      //snprintf(body, sizeof body, "{\"temp\": %d, \"ilu\": %d, \"umi\": %d, \"reservatorio\": %d}", temp1, ilu1, umi1, reservatorio1);

      Serial.println(body);
      Serial.println(strlen(body));
      
      String url = "/api/report";
      client.print(String("POST ") + url + " HTTP/1.1\r\n" +
               "Host: " + host + "\r\n" +
               "User-Agent: BuildFailureDetectorESP8266\r\n" +
               "Content-Type: application/json"+ "\r\n" +
               "Content-Length: "+ strlen(body) + "\r\n\r\n" + body + "\r\n" +
               "Connection: close\r\n\r\n");

      //solicitacao enviada

      
      
      while (client.connected()) {
        String line = client.readStringUntil('\n');
        if (line == "\r") {
          Serial.println(line);
          break;
        }
      }

      String line = client.readStringUntil('\n');
      if (line.startsWith("{\"success\":true")) {
          Serial.println(line);
          digitalWrite(LED, HIGH);
          delay(5000);
          digitalWrite(LED, LOW);
          delay(1000);      
      }else if(line.startsWith("{\"success\":false")) {
          Serial.println(line);
          digitalWrite(LED, HIGH);
          delay(7000);
          digitalWrite(LED, LOW);
          delay(1000);      
      }

}

void setup() {
  // put your setup code here, to run once:

  Serial.begin(9600);
  pinMode(LED, OUTPUT);
  connectWifi();
}

void loop() {
  // put your main code here, to run repeatedly:
  if (WiFi.status() == WL_CONNECTED) { //Check WiFi connection status

    
    digitalWrite(LED, HIGH);
    delay(1000);
    digitalWrite(LED, LOW);
    delay(1000);
    
    getConfig();
    sendReport();  
    delay(10000);

     
  
  }else{
    connectWifi();
  }
  
}
