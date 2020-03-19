# Github Notifications

[Github Notifications](https://github.niklasdeveloper.nu/)

**För kursen 1dv612**

På wiki sidan finner ni [Short system design report](https://gitlab.lnu.se/1dv612/student/nn222ia/examination/-/wikis/Arkitektur)

Denna applikation fungerar som en Notifikations-hub och Dashboard för användares Github.
Användare kan välja bland sina organisationer och eget repositorie för att sätta Webhooks för att få
notifikationer. Sätter man upp en url till slack genom Workbuilder så får man även offline-notifikationer via slack.

## Guide setup Workbuilder
* I slack klicka på ditt namn högst upp till vänster
* Välj Workflow Builder
* Klicka på Create och ange ett namn
* Nästa steg, ange webhook
* Klicka på Add Variable
* Ange på Key 'message' låt data stå som text
* Klicka på Save
* Klicka Add Step
* Välj Send Message
* Välj dig själv i drop-down listan
* Välj Insert a variable så ska du se din skapade variable 'message'
* Klicka på Spara
* Välj Publish
* Workflow är redo att användas och du kan klistra in din url hos applikationen för att få offline-notifikationer

### Applikationen stödjer webhooks
* Push
* Release
* Issue

## Tekniker

Inloggningen sköts genom OAuth till github.

### Server

På Serversidan så används [Serverless Framework](https://serverless.com/) för att bygga arktikteturen till [Amazons Lambda service](https://aws.amazon.com/lambda/?hp=tile&so-exp=below).

### Klient

Klienten byggs upp utav JavaScript-biblioteket [Reactjs](https://reactjs.org/) och använder start-up mallen [Create-React-App](https://github.com/facebook/create-react-app)

