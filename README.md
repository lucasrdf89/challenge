# Challenge

## How to init project

1. Install npm modules.
    ```sh
    yarn install
    ```

2. You need to install firebase global tools
    ```sh
    yarn install -g firebase-tools
    firebase login
    ```
  __NOTE__: Need access from Firebase project. More help in [Firebase Documentation](https://firebase.google.com/docs/functions/get-started).

3. Install npm modules for functions
    ```sh
    cd functions
    yarn install
    ```

## How to run project

1. Install npm modules.
    ```sh
    yarn install
    ```

2. Run server.
    ```sh
    yarn dev
    ```

## How to export indexes

```sh
yarn run export-indexes
```

## How to manage Firebase secrets

1. Set a secret (e.g., API token):
    ```sh
    firebase functions:config:set api.token="your-secret-token"
    ```

2. View all secrets:
    ```sh
    firebase functions:config:get
    ```

__NOTE__: Replace `"your-secret-token"` with the actual token used by the API.

## Notas de Desarrollo

### Decisiones de Diseño
- Se adoptó una arquitectura modular para facilitar la escalabilidad y el mantenimiento del proyecto.
- Los componentes de Angular se diseñaron de forma independiente para reducir las dependencias entre módulos y mejorar el rendimiento general.
- La estrategia de detección de cambios está configurada en `OnPush`, lo que optimiza el renderizado y minimiza las verificaciones innecesarias.
- Se desarrolló una API con Node.js y Express para gestionar las solicitudes del backend.
- Se configuraron workflows en GitHub Actions para automatizar tareas de integración y despliegue continuo.

### Tecnologías Utilizadas
- **Angular**: Framework principal para el desarrollo del frontend.
- **Firebase**: Proporciona servicios de backend como hosting, autenticación y funciones en la nube.
- **Material Design**: Uso de Angular Material para garantizar una interfaz de usuario coherente y responsiva.
- **Yarn**: Herramienta para la gestión de dependencias y ejecución de scripts.
- **Node.js y Express**: Base para la construcción de la API del backend.
- **Joi**: Librería utilizada para validar los datos de las solicitudes en la API.
- **Middlewares**: Implementados para manejar autenticación, validación de datos y gestión de errores en la API.
- **GitHub Actions**: Automatización de pruebas, despliegues y otras tareas de CI/CD.

### Comentarios Relevantes
- El componente de tabla incluye funcionalidades de paginación y ordenamiento, lo que permite manejar grandes volúmenes de datos de manera eficiente.
- Los secretos de Firebase se gestionan mediante los comandos `firebase functions:config`, asegurando que la información sensible se almacene de forma segura.
- La API desarrollada con Express utiliza middlewares para validar datos con Joi, gestionar errores y autenticar solicitudes.
- Los workflows de GitHub Actions están configurados para ejecutar pruebas automáticas y desplegar la aplicación en Firebase Hosting.
- Se utiliza `ChangeDetectionStrategy.OnPush` en Angular para optimizar el rendimiento al reducir los ciclos de detección de cambios.
- Es importante contar con acceso al proyecto de Firebase antes de ejecutar la aplicación, ya que algunas funcionalidades dependen de su configuración.
