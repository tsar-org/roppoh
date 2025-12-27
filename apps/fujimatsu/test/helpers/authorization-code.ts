import { faker } from "@faker-js/faker";
import type { AuthorizationCode } from "@/durable-objects/authorization-code-store";

export function generateRandomAuthCode(
  override: Partial<AuthorizationCode>,
): AuthorizationCode {
  return {
    clientId: faker.string.uuid(),
    code: faker.lorem.words(),
    consume: false,
    createdAt: faker.date.recent().getTime(),
    expiresAt: faker.date.soon().getTime(),
    redirectUri: faker.internet.url(),
    scope: faker.lorem.words(),
    subject: faker.string.uuid(),
    ...override,
  };
}
