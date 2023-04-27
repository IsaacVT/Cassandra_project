Use this to create the file cassadra_trutstore.jks:

```
    curl https://www.amazontrust.com/repository/AmazonRootCA1.pem -O --ssl-no-revoke
    
    openssl x509 -outform der -in AmazonRootCA1.pem -out temp_file.der
    
    // For error to openssl: https://tecadmin.net/install-openssl-on-windows/
    
    keytool -import -alias cassandra -keystore cassandra_truststore.jks -file temp_file.der
```

Before copy the file and paste on this directory.