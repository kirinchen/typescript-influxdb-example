# typescript-influxdb-example

## Preparatory action

Create env file ``` ./myconfig/typescript-influxdb-example.env ``` 

the content is 

```gradle
influxdata_url={influxdata_url}
influxdata_token={influxdata_token}
influxdata_org={influxdata_org}
influxdata_bucket={influxdata_bucket}
``` 

Replace those value :

* login https://cloud2.influxdata.com/usage
* Load Data > Bucket
* Find influxdata_url / influxdata_org / influxdata_bucket

![image](https://github.com/kirinchen/typescript-influxdb-example/blob/master/doc/doc1.png?raw=true)

* go Tokens Tab , and generate new Toke , and copy token to influxdata_token
* done


## NPM

* Install Nodejs and Npm
* cmd go to project floder
* type ``` npm install  ```

## Run

* type ``` npm run start  ```





