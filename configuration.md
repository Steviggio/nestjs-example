# Guide d'Initialisation et Configuration d'une API avec NestJS

Ce guide vous aidera à démarrer avec NestJS pour créer une API RESTful. Nous allons couvrir les étapes de base, y compris la création d'un modèle de données, la définition de routes, la création d'un contrôleur et la configuration d'un service.

## Prérequis

- Node.js installé
- Un éditeur de texte ou un environnement de développement intégré (IDE)

## Étapes

### 1. Installation de NestJS

Pour commencer, vous devez installer NestJS en utilisant le générateur de projets :

```bash
npm install -g @nestjs/cli
nest new my-api
cd my-api
```

### Configuration de la base de données : 

Dans l'exemple suivant, une base de donnée MongoDB est utilisé, les étapes de configuration concerneront donc mongoose, qui est l'ODM associé à Node.js pour intéragir avec une DB MongoDB. 

Installez le module "@nestjs/mongoose" pour MongoDB avec la commande suivante : 

```
npm install --save @nestjs/mongoose mongoose
```

### Création d'un modèle de données

Créez un modèle de données en utilisant Mongoose (dans cet exemple, un modèle User) dans un fichier, par exemple, user.model.ts. Assurez-vous d'importer les dépendances nécessaires :

```ts
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
```

### Création d'un service :

Créez un service pour gérer la logique métier liée au modèle de données. Dans un fichier user.service.ts, créez des méthodes pour effectuer des opérations CRUD sur les données :

```ts
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.model';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  // Implémentez ici les méthodes pour gérer les utilisateurs dans la base de données
}
```

### Création d'un contrôleur :

Créez un contrôleur pour définir les routes et gérer les requêtes HTTP. Dans un fichier user.controller.ts, définissez les routes, importez le service et gérez les requêtes :

```ts
import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.model';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll() {
    // Gérez la requête GET
  }

  @Post()
  async create(@Body() user: User) {
    // Gérez la requête POST
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() user: User) {
    // Gérez la requête PUT
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    // Gérez la requête DELETE
  }
}
```

### Créez un module : 

Créez un module pour organiser les contrôleurs, les services et les dépendances. Dans un fichier user.module.ts, importez le modèle, le contrôleur et le service, puis configurez le module :

```ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User, UserSchema } from './user.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
```

### Enregistrez le module principal:

Enregistrez le module des utilisateurs (ou tout autre module que vous avez créé) dans le module principal de votre application (généralement app.module.ts) :

```ts 
import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule],
})
export class AppModule {}
```

### Éxécution de l'application : 

Vous pouvez maintenant exécuter votre application NestJS en utilisant la commande suivante :

```bash
npm run start
```

Votre API est désormais prête à être utilisée et peut être testée en utilisant un outil tel que Postman ou un navigateur web.

Cela résume les étapes de base pour initier et configurer une API avec NestJS en utilisant Mongoose pour la gestion de la base de données. Vous pouvez ajouter des fonctionnalités supplémentaires, des middlewares et des stratégies d'authentification en fonction des besoins de votre application.