# alphacode-test

## Instruções de Uso

* O arquivo de scripts sql contidos na pasta `database` deverá ser executado em algum sistema de gerênciamento de banco de dados para que haja a criação do banco, tabelas necessárias e registro de dados padrões;

* É necessário o uso de um servidor local como o XAMPP para execução da api em PHP. No caso de uso do XAMPP o diretório `api` do projeto poderá ser colocado na pasta `htdocs` criada pelo próprio XAMPP;

* Para a conexão da api com o banco de dados, o valor de algumas variáveis deverão ser alteradas no arquivo `Connection.php` (localizado no diretório `./app/api`), para que assim os valores correspondam corretamente com as credênciais do banco criado localmente;

* Referente ao front-end do projeto, o arquivo `index.html` (localizado no diretório `./app/frontend`), deverá ser executado em algum servidor local, um exemplo seria utilizando extensão "Live Server" pelo Visual Studio Code;

* Para que a conexão com a API funcione corretamente, a url localizada no arquivo `apiCalls.js` (encontrado no diretório `./app/frontend/assets/js`) deverá ser alterada para que corresponda a url gerada pelo servidor local de PHP;