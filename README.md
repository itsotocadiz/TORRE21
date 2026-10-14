# ♠ BLACK JACK: LA TORRE DEL 21 ♠

Roguelike táctico de cartas para Android basado en la mística del 21, combate estratégico por turnos y ascensión procedural.

---

## 🎮 Características Principales

* **Mecánica de Combate:** Duelos basados en Blackjack donde cada carta suma hacia el 21. Si te plantas o consigues Blackjack, infliges daño con tu poder y tu apuesta.
* **4 Clases de Héroes Únicos:** Caballero, Pícaro, Monje y Nigromante, cada uno con habilidades pasivas, progresión permanente de maestría y aspectos temáticos.
* **Sistema de Ascensión de 4 Dificultades:**
  * 🟢 **Torre del Novicio** (7 Pisos)
  * 🟡 **Torre Guerrera** (9 Pisos)
  * 🔴 **Torre Maestra** (11 Pisos)
  * 🟣 **Torre de la Perdición** (13 Pisos)
* **Arena PvP / Al mejor de 3 (BO3):** Duelos dinámicos contra campeones y heraldos.
* **Estilo Visual:** Arte vectorial tipo *Paper Mario* con 57 SVGs procedurales de alta definición.
* **Integración Móvil Nativa:** Capacitor 7 con ciclo de vida Android, retroceso nativo, hápticos y pausa en segundo plano.

---

## 🛠️ Tecnologías

* **Frontend:** Vanilla JavaScript (ES6+), HTML5 Canvas, CSS3 avanzado.
* **Wrapper Móvil:** [Capacitor](https://capacitorjs.com/) v7.
* **Build System:** Gradle 8.14.3 + Java 21 LTS (Temurin).
* **Target SDK:** Android 36 (Android 16 Ready).

---

## 🚀 Comandos del Proyecto

### Verificación y Pruebas
```bash
npm run verify      # Ejecuta las 38 suites de tests + verificación de integridad + comprobación de sincronización
npm test            # Ejecuta únicamente la suite de pruebas unitarias y de integración
```

### Sincronización de Fuentes
El proyecto utiliza la raíz como única fuente de verdad:
```bash
node scripts/sync-all.js    # Copia raíz -> www/ -> android/app/src/main/assets/public/
```

### Compilación Android (APK)
```bash
cd android
./gradlew assembleDebug
```
El instalador generado se encuentra en `android/app/build/outputs/apk/debug/app-debug.apk`.

---

## 📜 Licencia y Atribución
* Música y Efectos de Sonido: Dominio público (CC0).
* Código fuente y diseño de mecánicas: Propietario.
