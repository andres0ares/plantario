#include <ESP8266WiFi.h>
#include <WiFiClientSecure.h>
#include <ArduinoJson.h>

#ifndef STASSID
#define STASSID "brisa-1123109"  //nome do wifi
#define STAPSK  "hidiqmzu"  //senha wifi       
#endif

const char* ssid = STASSID;
const char* password = STAPSK;

const char* host = "plantario.oandre.com";
const int httpsPort = 443;
const char fingerprint[] PROGMEM = "ccd3380ed0c69d741c8b01d6d0c91ad6526ff1e3";

int ilu = 5;
int umi = 60;
int temp = 29;

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

          /*
       POST /post HTTP/1.1
       Host: postman-echo.com
       Content-Type: application/json
       Content-Length: 13
      
       say=Hi&to=Mom
        
       */
    
      String url = "/api/report";
      client.print(String("POST ") + url + " HTTP/1.1\r\n" +
               "Host: " + host + "\r\n" +
               "User-Agent: BuildFailureDetectorESP8266\r\n" +
               "Content-Type: application/json"+ "\r\n" +
               "{\"temp\":28,\"ilu\":7,\"umi\":78}" + "\r\n" +
               "Connection: close\r\n\r\n");

      //solicitacao enviada
      
      while (client.connected()) {
        String line = client.readStringUntil('\n');
        if (line == "\r") {
          //headers received
          break;
        }
      }

}

void setup() {
  // put your setup code here, to run once:
  

  Serial.begin(115200);
  connectWifi();
}

void loop() {
  // put your main code here, to run repeatedly:
  if (WiFi.status() == WL_CONNECTED) { //Check WiFi connection status
 
      
    getConfig();
    sendReport();  
    delay(10000);

     
  
  }else{
    connectWifi();
  }
  
}