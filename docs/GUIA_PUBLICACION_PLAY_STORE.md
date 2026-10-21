# Guía Definitiva de Publicación en Google Play Store
**Juego:** Black Jack: La Torre del 21  
**Package ID:** `com.blacktower.roguelike`  
**Versión Actual:** `1.7.1` (VersionCode: `8`)

Esta guía proporciona las respuestas exactas y el checklist paso a paso para completar la ficha de la aplicación en Google Play Console sin riesgo de rechazo por políticas de contenido o facturación.

---

## 1. URL de la Política de Privacidad

En Google Play Console $\rightarrow$ **Contenido de la aplicación** $\rightarrow$ **Política de privacidad**:
- **URL pública requerida:** `https://itsotocadiz.github.io/TORRE21/privacy-policy.html`  
  *(Asegúrate de activar GitHub Pages en la rama `main` del repositorio).*
- **Correo de contacto:** `itsotocadiz@gmail.com`

---

## 2. Cuestionario de Clasificación de Contenido (IARC)

En Google Play Console $\rightarrow$ **Clasificación de contenido**:
- **Categoría de la aplicación:** Seleccionar **"Juego"**.
- **Violencia:**
  - *¿El juego contiene representaciones de violencia contra personajes ficticios?* $\rightarrow$ **Sí** (violencia de fantasía animada estilo cómic / papel recortado, sin sangre realística ni desmembramientos).
- **Sexualidad / Desnudez:** $\rightarrow$ **No**.
- **Lenguaje ofensivo:** $\rightarrow$ **No**.
- **Sustancias controladas (drogas/alcohol/tabaco):** $\rightarrow$ **No**.
- **Juegos de azar (CRÍTICO):**
  - *¿El juego permite a los usuarios apostar con dinero real?* $\rightarrow$ **NO**.
  - *¿El juego contiene juegos de azar simulados (por ejemplo, juegos de cartas de casino o máquinas tragamonedas con apuestas simuladas)?* $\rightarrow$ **SÍ**.
- **Funciones interactivas:**
  - *¿El juego comparte la ubicación física del usuario con otros usuarios?* $\rightarrow$ **No**.
  - *¿El juego permite la interacción o intercambio de mensajes de texto/voz no filtrados entre usuarios?* $\rightarrow$ **No**.
- **Resultado esperado de clasificación:** **PEGI 12 / ESRB Teen (T)** con descriptor de contenido *"Simulated Gambling / Fantasy Violence"*.

---

## 3. Formulario de Seguridad de los Datos (Data Safety)

En Google Play Console $\rightarrow$ **Seguridad de los datos**:
- **Recopilación y uso compartido de datos:**
  - *¿Tu aplicación recopila o comparte alguno de los tipos de datos de usuario requeridos?* $\rightarrow$ **Sí** (únicamente por la biblioteca de pagos Google Play Billing).
  - *¿Todos los datos de usuario recopilados por tu aplicación están cifrados en tránsito?* $\rightarrow$ **Sí**.
  - *¿Tu aplicación proporciona a los usuarios una forma de solicitar que se eliminen sus datos?* $\rightarrow$ **Sí** (el usuario puede reiniciar su progreso desde el menú Ajustes del juego o desinstalando la app).
- **Tipos de datos específicos:**
  - **Información financiera $\rightarrow$ Historial de compras:**
    - Recopilado: **Sí** (procesado directamente por el SDK de Google Play Billing).
    - Compartido: **No**.
    - Finalidad: **Funcionalidad de la aplicación (gestión de compras y activación de perks)**.
    - Opcional/Obligatorio: **Opcional** (las compras no son obligatorias para jugar).
  - **Ubicación, Información personal (nombre, email), Fotos, Contactos:** $\rightarrow$ **No se recopila nada**.

---

## 4. Productos de Compra Integrada (In-App Products - SKUs)

En Google Play Console $\rightarrow$ **Monetizar con Play** $\rightarrow$ **Productos dentro de la aplicación**:
Crear los siguientes 3 identificadores exactos (deben coincidir al 100% con el código del juego):

| ID de Producto (SKU) | Nombre del Producto | Tipo | Descripción Recomendada |
|---|---|---|---|
| `royal_pack_starter` | Pack del Heredero | Gestionado (Única vez) | Desbloquea +10 Monedas de Cripta iniciales y bendición de combate. |
| `royal_tomo_maestro` | Tomo del Maestro | Gestionado (Única vez) | Multiplica la ganancia de experiencia de héroe por x1.5 permanente. |
| `royal_bundle_los_jacks` | Bundle de Héroes | Gestionado (Única vez) | Desbloquea instantáneamente las 4 clases de héroes con aspectos clásicos. |

---

## 5. Requisitos Gráficos y Multimedia de la Ficha

- **Icono de la aplicación:** 512 x 512 px (PNG de 32 bits con canal alfa).
- **Gráfico de funciones (Banner):** 1024 x 500 px (JPG o PNG de 24 bits, sin canal alfa).
- **Capturas de pantalla para teléfono:**
  - Mínimo 4 capturas en orientación vertical (1080 x 1920 px o 1080 x 2400 px).
  - Se recomienda capturar:
    1. Combate activo de Blackjack con la mesa y cartas elementales.
    2. Árbol de Talentos permanente con las 4 ramas.
    3. Rueda del Destino o Coliseo Arena PvP.
    4. Ficha del Héroe y prólogo narrativo en cómic.

---

## 6. Procedimiento de Compilación de Release (AAB)

Para subir a Google Play Store, Google exige el formato **Android App Bundle (`.aab`)**:

1. Abrir la carpeta `./android` en **Android Studio**.
2. En el menú superior: **Build $\rightarrow$ Generate Signed Bundle / APK...**
3. Seleccionar **Android App Bundle**.
4. Crear o seleccionar tu almacén de claves (`.jks`) de desarrollador.
5. Seleccionar la variante de compilación `release`.
6. Subir el archivo `.aab` resultante a **Google Play Console $\rightarrow$ Producción (o Pruebas Internas)**.
