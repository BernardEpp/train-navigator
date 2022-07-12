import { expect } from "chai";
import { searchConnection } from "../navigator.js";

describe("test framework works", () => {
  it("asserts primitives correctly", () => {
    expect(1 + 1).to.equal(2);
  });
});

describe("search connection works", () => {
  it("can call search Connection subroutine", () => {
    expect(() => searchConnection("start", "end")).not.to.throw();
  });

  it("finds connection from Stuttgart to Kassel", () => {
    // Arrange
    const expectedRoutes = [
      ["Stuttgart", "Mannheim", "Frankfurt", "Kassel"],
      ["Stuttgart", "Mannheim", "Frankfurt", "Würzburg", "Kassel"],
    ];

    // Act
    const results = searchConnection("Stuttgart", "Kassel");

    // Assert
    expect(results).to.have.same.deep.members(expectedRoutes);
  });

  it("finds connection from Nürnberg to Karlsruhe", () => {
    // Arrange
    const expectedRoutes = [
      ["Nürnberg", "Würzburg", "Frankfurt", "Mannheim", "Karlsruhe"],
      ["Nürnberg", "München", "Augsburg", "Stuttgart", "Karlsruhe"],
    ];

    // Act
    const results = searchConnection("Nürnberg", "Karlsruhe");

    // Assert
    expect(results).to.have.same.deep.members(expectedRoutes);
  });

  it("finds connection from Stuttgart to München", () => {
    // Arrange
    const expectedRoutes = [
      ["Stuttgart", "Augsburg", "München"],
      ["Stuttgart", "Mannheim", "Frankfurt", "Würzburg", "München"],
      ["Stuttgart", "Mannheim", "Frankfurt", "Würzburg", "Nürnberg", "München"],
    ];

    // Act
    const results = searchConnection("Stuttgart", "München");

    // Assert
    expect(results).to.have.same.deep.members(expectedRoutes);
  });

  it("is 'stateless', i.e. subsequent searches work fine", () => {
    // Arrange
    const expectedRoutesToKarlsruhe = [
      ["Nürnberg", "Würzburg", "Frankfurt", "Mannheim", "Karlsruhe"],
      ["Nürnberg", "München", "Augsburg", "Stuttgart", "Karlsruhe"],
    ];
    const expectedRoutesToKassel = [
      ["Stuttgart", "Mannheim", "Frankfurt", "Kassel"],
      ["Stuttgart", "Mannheim", "Frankfurt", "Würzburg", "Kassel"],
    ];

    // Act
    const resultsForKassel = searchConnection("Stuttgart", "Kassel");
    const resultsForKarlsruhe = searchConnection("Nürnberg", "Karlsruhe");

    // Assert
    expect(resultsForKassel).to.have.same.deep.members(expectedRoutesToKassel);
    expect(resultsForKarlsruhe).to.have.same.deep.members(
      expectedRoutesToKarlsruhe
    );
  });
});

describe("Search connection is robust against user input", () => {
  it("can handle empty input", () => {
    expect(() => searchConnection("", "")).to.not.throw();
    expect(() => searchConnection("Stuttgart", "")).to.not.throw();
    expect(() => searchConnection("", "Stuttgart")).to.not.throw();
  });

  it("can does not throw error if city was not found", () => {
    expect(() => searchConnection("Stuttgart", "Not-A-City")).to.not.throw();
  });

  it("returns empty array if city was not found", () => {
    // Act
    const result = searchConnection("Stuttgart", "Not-A-City");

    // Assert
    expect(result).to.have.lengthOf(0);
  });

  it("works if cities are the same", () => {
    // Arrange
    let result;

    // Act
    expect(
      () => (result = searchConnection("München", "München"))
    ).to.not.throw();

    // Assert
    expect(result).to.have.lengthOf(0);
  });
});
