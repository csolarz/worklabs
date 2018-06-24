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

Status Code | Descriptcion
----------- | -------------
200 OK | Respuesta existosa (genérico)
201 Created | Usado como respuesta a un POST method para indicar creación exitosa de un recurso. Si el recurso ya fue creado (por una ejecución previa del mismo método e.g.), el server debe retornar status code 200 OK.
202 Accepted | Usado para la ejecución de metodos asíncronos, el server acepta la petición y la ejecutará mas tarde
204 No Content | El server ha ejecutado existosamente la petición, pero no hay una respuesta que retornar.
400 Bad Request | La peticion no puede ser interpretada por el server. Use este status code para especificar: <ul><li>The data as part of the payload cannot be converted to the underlying data type.</li><li>The data is not in the expected data format.</li><li>Required field is not available.</li><li>Simple data validation type of error.</li></ul>
401 Unauthorized | El request requiere authentication y ninguna ha sido provista. Note la diferencia entre 403 Forbidden
403 Forbidden | El cliente no está autorizado para acceder al recurso, aunque puede tener credenciales validas. API could use this code in case business level authorization fails. For example, accound holder does not have enough funds.
404 Not Found | El servidor no ha encontrado nada que coincida con la URI solicitada. Esto significa que la URI es incorrecta o que el recurso no está disponible. Por ejemplo, puede ser que no haya datos en la base de datos en esa key.
405 Method Not Allowed | El servidor no ha implementado el método HTTP solicitado. Esto es típicamente el comportamiento predeterminado para los frameworks API.
406 Not Acceptable |
415 Unsupported Media Type | 
422 Unprocessable Entity | 
429 Too Many Requests |
500 Internal Server Error | Error inesperado en el servidor, generalmente indica que aunque el cliente aparentemente proporcionó una solicitud correcta, algo inesperado ha fallado en el servidor. Una respuesta 500 indica un defecto del software del lado del servidor o una interrupción del sitio. 500 NO DEBE utilizarse para la validación del cliente o el manejo de errores de negocio.
503 Service Unavailable | 


