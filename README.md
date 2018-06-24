# Project Title

One Paragraph of project description goes here

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### REST Resources
Dado el recurso persona, la siguiente URI provee las normas de acceso a extraer el recurso persona, nótese el uso de singular para el nombre del recurso 

#### Extraccion de datos

URI | Method | Notas
-----| ------- | -------------
/persona | GET | Retorna una lista de la entidad persona, en el caso de tablas con mas de 100 registros se debe devolver una lista paginada con los primeros 100 registros, por defecto retorna todas las personas en estado vigente = "1".
/persona/{id} | GET | Retorna todo el contenido de una persona dada una {id}. El campo {id} corresponde al id de la tabla o identificador del recurso.
/persona?limit=25&offset=50 | GET | Retorna una lista de la entidad persona desde el registro 51 al 75, offset=50 significa: ‘saltarse los primeros 50 registros’, limit=25 significa: ‘retorna un máximo de 25 registros’ si limit es undefined debe asumirse el valor 100 por defecto.

La extracción de datos debe realizarse siempre a través del método GET

#### Insercción y actualización de datos

URI | Method | Notas
-----| ------- | -------------
/persona | POST | Registra una nueva entidad persona, todos los campos se deben pasar mediante el body.
/persona/{id1}/vincular/{id2} | POST | Realiza la accion de ejemplo "vincular" entre {id1} y {id2}.
/persona/{id} | PUT | Registra una modificación de la entidad persona dada su identificador de recurso {id}.
/persona/{id} | DELETE | Realiza la eliminación de la entidad persona dado su identificador de recurso {id}.

La extracción de datos debe realizarse siempre a través del método GET


#### Códigos de respuesta Http



