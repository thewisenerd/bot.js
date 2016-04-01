_ = {
  "connections": [
    {
      "nick": "bakabot",
      "userName": "bakabot",
      "realName": "bakabot",  

      "connection": {
        "server": "chat.freenode.net",
        "port": 6667,

        "retryCount": 10, // connection retries
        "retryDelay": 2000, // delay b/w retries

        "sasl": false, // use sasl for auth: needs nick, userName, pass 
        "password": false, // pass for sasl

        "certExpired": false, // allow expired certificates
        "selfSigned": false, // allow certificates from non-trusted CA
        "secure": false, // use ssl
        /* to use a self signed certificate:
         *  - remove above line
         *  - uncomment following commented lines */
        //"secure": {
        //  "key": "../path/to/key.pem",
        //  "cert": "../path/to/certificate.crt"
        //}

        "encoding": "" // use specific encoding for server bound messages
      },

      "nickserv": {
        "enabled": false, // enable nickserv auth on connect
        "nickserv_password": "",
        "nickserv_name": "nickserv",
        "nickserv_command": "IDENTIFY"
      },

      "autoRejoin": false, // auto-rejoin channels on kick

      "channels": [
        "#teamcody"
      ], // default channels to join

      "floodProtection": false, // enable flood-protection
      "floodProtectionDelay": 1000, // set specific flood-protection delay

      "messageSplit": 512, // message-split length 
    }
  ],
  "data": {
    "api_keys": {
      "google": "ABC",
      "github": "PQR",
    },
    "database": "sqlite://db.sqlite"
  }
};
