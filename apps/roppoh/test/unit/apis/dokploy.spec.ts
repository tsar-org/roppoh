import { describe, expect, it } from "vitest";
import { requestProxy } from "../../../app/apis/dokploy";

describe("requestProxy function", () => {
  const API_URL_ORIGIN = "https://app.example.com";
  const API_URL_PATH = "/api/dokploy";
  const API_URL = API_URL_ORIGIN + API_URL_PATH;
  const env = {
    CF_ACCESS_CLIENT_ID: "test-client-id",
    CF_ACCESS_CLIENT_SECRET: "test-client-secret",
    DOKPLOY_API_TOKEN: "test-api-token",
    DOKPLOY_API_URL: "https://dokploy.example.com",
  };
  const DOKPLOY_API_PATH = "/api";

  describe("URL transformation", () => {
    it("should convert /api/dokploy/ path to /api/", () => {
      // Arrange
      const request = new Request(`${API_URL}/servers`);

      // Act
      const actual = requestProxy({ env, request });

      // Assert
      expect(actual.url).toBe(
        `${env.DOKPLOY_API_URL + DOKPLOY_API_PATH}/servers`,
      );
    });

    it("should preserve query parameters", () => {
      // Arrange
      const request = new Request(`${API_URL}/servers?status=active&limit=10`);

      // Act
      const actual = requestProxy({ env, request });

      // Assert
      expect(actual.url).toBe(
        `${env.DOKPLOY_API_URL + DOKPLOY_API_PATH}/servers?status=active&limit=10`,
      );
    });

    it("should handle nested paths correctly", () => {
      // Arrange
      const request = new Request(`${API_URL}/servers/123/deployments`);

      // Act
      const actual = requestProxy({ env, request });

      // Assert
      expect(actual.url).toBe(
        `${env.DOKPLOY_API_URL + DOKPLOY_API_PATH}/servers/123/deployments`,
      );
    });

    it("should handle special characters in query parameters", () => {
      // Arrange
      const request = new Request(
        `${API_URL}/search?q=hello%20world&tag=foo%26bar`,
      );

      // Act
      const actual = requestProxy({ env, request });

      // Assert
      expect(actual.url).toBe(
        `${env.DOKPLOY_API_URL + DOKPLOY_API_PATH}/search?q=hello%20world&tag=foo%26bar`,
      );
    });
  });

  describe("headers", () => {
    it("should set required authentication and access headers", () => {
      // Arrange
      const request = new Request(`${API_URL}/servers`);

      // Act
      const actual = requestProxy({ env, request });

      // Assert
      expect(actual.headers.get("x-api-key")).toBe(env.DOKPLOY_API_TOKEN);
      expect(actual.headers.get("CF-Access-Client-Id")).toBe(
        env.CF_ACCESS_CLIENT_ID,
      );
      expect(actual.headers.get("CF-Access-Client-Secret")).toBe(
        env.CF_ACCESS_CLIENT_SECRET,
      );
      expect(actual.headers.get("Accept")).toBe("application/json");
    });

    it("should preserve existing headers", () => {
      // Arrange
      const request = new Request(`${API_URL}/servers`, {
        headers: {
          "Content-Type": "application/json",
          "X-Custom-Header": "custom-value",
        },
      });

      // Act
      const actual = requestProxy({ env, request });

      // Assert
      expect(actual.headers.get("Content-Type")).toBe("application/json");
      expect(actual.headers.get("X-Custom-Header")).toBe("custom-value");
    });

    it("should override Accept header even if provided in original request", () => {
      // Arrange
      const request = new Request(`${API_URL}/servers`, {
        headers: {
          Accept: "text/html",
        },
      });

      // Act
      const actual = requestProxy({ env, request });

      // Assert
      expect(actual.headers.get("Accept")).toBe("application/json");
    });
  });

  describe("HTTP method", () => {
    it("should preserve GET method", () => {
      // Arrange
      const request = new Request(`${API_URL}/servers`, {
        method: "GET",
      });

      // Act
      const actual = requestProxy({ env, request });

      // Assert
      expect(actual.method).toBe("GET");
    });

    it("should preserve POST method", () => {
      // Arrange
      const request = new Request(`${API_URL}/servers`, {
        body: JSON.stringify({ name: "test-server" }),
        method: "POST",
      });

      // Act
      const actual = requestProxy({ env, request });

      // Assert
      expect(actual.method).toBe("POST");
    });

    it("should preserve PUT method", () => {
      // Arrange
      const request = new Request(`${API_URL}/servers/123`, {
        body: JSON.stringify({ name: "updated-server" }),
        method: "PUT",
      });

      // Act
      const actual = requestProxy({ env, request });

      // Assert
      expect(actual.method).toBe("PUT");
    });

    it("should preserve DELETE method", () => {
      // Arrange
      const request = new Request(`${API_URL}/servers/123`, {
        method: "DELETE",
      });

      // Act
      const actual = requestProxy({ env, request });

      // Assert
      expect(actual.method).toBe("DELETE");
    });
  });

  describe("request body", () => {
    it("should preserve request body for POST requests", async () => {
      // Arrange
      const bodyData = { name: "test-server", type: "production" };
      const request = new Request(`${API_URL}/servers`, {
        body: JSON.stringify(bodyData),
        method: "POST",
      });

      // Act
      const actual = requestProxy({ env, request });

      // Assert
      const actualBody = await actual.text();
      expect(JSON.parse(actualBody)).toEqual(bodyData);
    });

    it("should preserve request body for PUT requests", async () => {
      // Arrange
      const bodyData = { status: "inactive" };
      const request = new Request(`${API_URL}/servers/123`, {
        body: JSON.stringify(bodyData),
        method: "PUT",
      });

      // Act
      const actual = requestProxy({ env, request });

      // Assert
      const actualBody = await actual.text();
      expect(JSON.parse(actualBody)).toEqual(bodyData);
    });

    it("should handle null body for GET requests", () => {
      // Arrange
      const request = new Request(`${API_URL}/servers`, {
        method: "GET",
      });

      // Act
      const actual = requestProxy({ env, request });

      // Assert
      expect(actual.body).toBeNull();
    });
  });
});
