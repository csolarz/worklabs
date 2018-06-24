# Project Title

One Paragraph of project description goes here

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### REST Resources
#### Extraccion de datos
Dado el recurso persona, la siguiente URI provee las normas de acceso a extraer el recurso persona, nótese el uso de singular para el nombre del recurso 

URI | Method | Notas
-----| ------- | -------------
/persona | GET | Retorna una lista de personas, en el caso de tablas con mas de X registros se debe devolver una lista paginada con los primeros X registros, por defecto retorna todas las personas en estado vigente = "1"
/persona/{key} | GET | Retorna todo el contenido de una persona dada una {key}.
/persona/
