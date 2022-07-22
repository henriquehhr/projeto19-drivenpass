import {faker} from "@faker-js/faker";

export function createSafeNote () {
  const safeNote = {"title": faker.lorem.sentence(5), "text": faker.lorem.sentence(5)}
  return safeNote;
}