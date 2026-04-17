# MDKVA TasbihKit — Dhikr & Tasbih API

**[mdkva.com/apis/tasbihkit/](https://mdkva.com/apis/tasbihkit/)**

-----

## Overview

TasbihKit is a data API designed for the retrieval of structured Dhikr and Tasbih collections. It provides developers with standardized datasets and organized categories to facilitate the integration of remembrance texts into digital applications.

## Available Methods

  * **`TasbihKit.loadAll(category)`**: Retrieves all entries within a specific category.
  * *Supported Categories*: `general`, `post-prayer`, `day-and-night`, and `magic-breaker`.
  * **`TasbihKit.searchById(category, id)`**: Retrieves a specific Tasbih entry using its unique ID.
  * **`TasbihKit.searchByIds(category, [ids])`**: Retrieves multiple Tasbih entries via an array of unique IDs.
  * **`TasbihKit.searchByLabel(category, keyword)`**: Searches through Arabic labels for the specified keyword.
  * **`TasbihKit.searchByTranslation(category, phrase)`**: Performs a search within the English translations for a specific phrase.

## Technical Standards

  * **Data Organization**: Provides a centralized dataset to eliminate manual collection and verification.
  * **JSON Responses**: Standardized output format for easy integration into web and mobile frameworks.
  * **Privacy-First**: No data retention or tracking of API requests.
  * **Architecture**: Focuses on a quiet, structured data layer to reduce developer-side friction.

## Support & Inquiry
For inquiries and feedback, please reach out via:
* Official Site: **[MDKVA.com](https://mdkva.com/)**
* Direct Email: **[Danyal@MDKVA.com](mailto:danyal@mdkva.com)**
* Personal Blog: **[MDanyalKayani.com](https://mdanyalkayani.com)**

---

> *"Simplifying Life with Human-Centered Tech."*
> — **Danyal**