# Medicalily

## Description
Approximately 12 million people are affected by medical diagnostic errors in the United States each year, with women and minorities being disproportionately affected. It is an issue that requires scrutinizing the current infrastructure without undermining the patient's trust in the medical system. Medicalily strives to use the power of crowdsourcing to create a database of symptoms and diagnoses to keep medical providers and patients informed. We aim to create a community-driven aggregation of resources that empowers patients to remain aware of topics regarding their health.

## Technical Overview
The application is structured in the client server model, with CockroachDB as the general purpose database, Express.js as the backend framework, and React Native for the frontend. We designed custom data models to organize the entities; so far we have implemented user and medical history entities. The entities are managed using Sequelize, an object-relational mapper that abstracts our SQL entities into objects. For each user, we use JWT tokens to track and encrypt login information across transactions. To connect between the server and client during testing, we use `ngrok` to tunnel to localhost.

## Technical Requirements
The application requires the latest versions of node and npm.

## Future Expansion
Our current implementation covers basic user functionality. With more time we could implement a filtration system for user-reported symptoms and diagnoses. We also plan to add demographic tags to popular posts as an additional point of interest for users.
