#include <ESP8266WiFi.h>
#include <WiFiClientSecure.h>
#include <ArduinoJson.h>

#ifndef STASSID
#define STASSID "**********"  //nome do wifi
#define STAPSK  "**********"  //senha wifi       
#define LED_R 12
#define LED_G 13
#define LED_Y 14
#endif

const char* ssid = STASSID;
const char* password = STAPSK;

const char* host = "plantario.oandre.com";
const int httpsPort = 443;
const char fingerprint[] PROGMEM = "ccd3380ed0c69d741c8b01d6d0c91ad6526ff1e3";

void setup() {
  // put your setup code here, to run once:
  pinMode(LED_R, OUTPUT);
  pinMode(LED_G, OUTPUT);
  pinMode(LED_Y, OUTPUT);

  Serial.begin(115200);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print("Connecting..");
  }
}

void loop() {
  // put your main code here, to run repeatedly:
  if (WiFi.status() == WL_CONNECTED) { //Check WiFi connection status
 
      WiFiClientSecure client;
      Serial.print("connecting to ");
      Serial.println(host);
    
      Serial.printf("Using fingerprint '%s'\n", fingerprint);
      client.setFingerprint(fingerprint);
    
      if (!client.connect(host, httpsPort)) {
        Serial.println("connection failed");
        return;
      }
    
      String url = "/api/command";
      Serial.print("requesting URL: ");
      Serial.println(url);

      client.print(String("GET ") + url + " HTTP/1.1\r\n" +
               "Host: " + host + "\r\n" +
               "User-Agent: BuildFailureDetectorESP8266\r\n" +
               "Connection: close\r\n\r\n");

      Serial.println("request sent");
      while (client.connected()) {
        String line = client.readStringUntil('\n');
        if (line == "\r") {
          Serial.println("headers received");
          break;
        }
      }
      String line = client.readStringUntil('\n');
      if (line.startsWith("{\"success\":true")) {
        Serial.println("esp8266/Arduino CI successfull!");
        StaticJsonDocument<192> doc;
        DeserializationError err = deserializeJson(doc, line);
        
        if(err) { return; }
        
        long lred = doc["data"]["ledRed"];
        long lgre = doc["data"]["ledGre"];
        long lyel = doc["data"]["ledYel"];

        if(lred){
          digitalWrite(LED_R, HIGH);
        }else{
           digitalWrite(LED_R, LOW);
        }

        if(lgre){
          digitalWrite(LED_G, HIGH);
        }else{
           digitalWrite(LED_G, LOW);
        }

        if(lyel){
          digitalWrite(LED_Y, HIGH);
        }else{
           digitalWrite(LED_Y, LOW);
        }

      } else {
        Serial.println("esp8266/Arduino CI has failed");
      }
  
  }
  
}
