# ChildRight

For better handling of child support. Digital, social, and courageous. The ChildRight application is designed to empower people to bring about the enforcement of a child support claim independently. The AI-supported app, with interactive knowledge transfer, community function, and suitable text templates, is designed to pick up users where they are and accompany them step by step. Basically a step-by-step wizard.

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

## How to install

* rename .env.example to .env and add your env variables
* setup a MySQL database and add the credentials to the .env file
* Create a GitHub OAuth app and add the client id and secret to the .env file
* cd into the project directory
* `npm install`

## How to run
* `npm run dev`
* (if you don't have all environment variables):  `SKIP_ENV_VALIDATION=1 npm run dev`

## Tech stack

Frontend:
* [React](https://reactjs.org/)
* [Next.js](https://nextjs.org/)
* [TypeScript](https://www.typescriptlang.org/)
* [Tailwind CSS](https://tailwindcss.com/)
* [TRPC](https://trpc.io/)
* [React Query](https://react-query.tanstack.com/)
* [Mantine](https://mantine.dev/)
* [Formik](https://formik.org/)
* [Storybook](https://storybook.js.org/)

Backend:
* [Next.js](https://nextjs.org/)
* [TypeScript](https://www.typescriptlang.org/)
* [Node.js](https://nodejs.org/en/)
* [TRPC](https://trpc.io/)
* [Zod](https://github.com/colinhacks/zod)

Database:
* [Prisma](https://www.prisma.io/)
* [MySQL](https://www.mysql.com/)
[Planetscale](https://planetscale.com/)

Authentication:
* [NextAuth.js](https://next-auth.js.org/)

Testing:
* [Playwright](https://playwright.dev/)
* [Vitest](https://vitest.dev/)

File Storage:
* [AWS S3](https://aws.amazon.com/s3/)

Realtime Communication:
* [Pusher](https://pusher.com/)

Logging:
* [Pino](https://getpino.io/)
* [Logflare](https://logflare.app/)

Hosting:
* [Vercel](https://vercel.com/)

Rate Limiting:
* [Upstash](https://upstash.com/)

CI/CD:
* [GitHub Actions](github.com/features/actions)

Email:
* [Namecheap](https://www.namecheap.com/)

Linting:
* [ESLint](https://eslint.org/)

## Documentation

This app is basically a form consisting of multiple steps.
The forms state management is handled using the Formik library.
The different steps are persisted in the database and the user can continue where they left off.

The API is defined using the TRPC library.
This has the advantage that the frontend knows about the types of the API endpoints, which makes it easier to work with the API and less likely for runtime errors to occur.

The app is written in a monorepo structure. The frontend and backend are in the same repository.
Nextjs is being used to serve the frontend and the backend.
The hosting is done by Vercel, which is connected to the GitHub repository.

When a request is made to the backend, it goes through the TRPC middleware until it reaches the corresponding procedure.
The procedure has an input validation schema, which is used to validate the input. It will return an error if the input is invalid.

React Query on the frontend takes care to also display errors and loading states in the app.

The authentication is done via NextAuth. For now, we have only implemented GitHub and Discord authentication. In the future, we want to add Google and Apple. 

The OAuth flow works like this:

1. The user clicks on the login button
2. They can choose between GitHub and Discord.
3. The corresponding OAuth provider is notified by the backend with all the necessary information.
4. The OAuth provider creates a sign in link.
5. The backend redirects the user to the sign in link.
6. The user logs in to their account.
7. The OAuth provider validates the credentials and sends a request to the callback URL on the backend specified in the OAuth app settings.
8. 