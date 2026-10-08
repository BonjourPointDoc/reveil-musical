Soddu-Chandemerle Valentine
# TP Examen - Réveil Musical

**Note :** Pour simuler les emails, sms et notificatons push, j'ai effectué des logs dans la console.

## Structure
```Plaintext
/src 
├──/application
│   ├──/ports (interfaces)
│   │   ├──/inbound 
│   │   └──/outbound 
│   └──server.ts
├──/domain
│   ├──/models
│   └──/services

├──/infrastructure
│   └──/adapters
│       ├──/music
│       ├──/notification
│       └── ... autres repositories
└──/presentation
    └──/controllers
```
## Audit des dépendances 

### package.json
| Package | Type | Version installée | Dernière version | Licence | Statut |
|---|---|:---:|:---:|---|---|
| `dotenv` | dependency | `18.0.4` | `18.0.6` | BSD-2-Clause | OK |
| `express` | dependency | `5.2.1` | `5.2.1` | MIT | OK |
| `reflect-metadata` | dependency | `0.2.2` | `0.2.2` | Apache-2.0 | OK |
| `tsyringe` | dependency | `4.10.0` | `4.10.0` | MIT | OK |
| `@types/express` | devDependency | `5.0.6` | `5.0.6` | MIT | OK |
| `@types/jest` | devDependency | `30.0.0` | `30.0.0` | MIT | OK |
| `@types/node` | devDependency | `26.6.1` | `26.6.4` | MIT | OK |
| `jest` | devDependency | `30.5.2` | `30.5.2` | MIT | OK |
| `ts-jest` | devDependency | `29.4.14` | `29.4.14` | MIT | OK |
| `ts-node-dev` | devDependency | `2.0.0` | `2.0.0` | MIT | OK |
| `typescript` | devDependency | `5.3.3` | `7.0.2` | Apache-2.0 | OK |

### Licenses 
Utilisation de la commande **npx license-checker -- summary** :

| Licence | Nombre | Type |
|---|---|---|
| MIT | 337 | Permissive |
| ISC | 38 | Permissive |
| BSD-3-Clause | 12 | Permissive |
| BlueOak-1.0.0 | 8 | Permissive |
| Apache-2.0 | 7 | Permissive |
| BSD-2-Clause | 3 | Permissive |
| (MIT OR CC0-1.0) | 2 | Permissive |
| 0BSD | 1 | Permissive |
| CC-BY-4.0 | 1 | Permissive |
