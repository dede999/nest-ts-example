import { RecipeService } from "./recipe.service";
import { Recipe, recipeFactory } from "./interfaces/recipe.interface";
import { Test } from "@nestjs/testing";
import { Model } from "mongoose";
import { random } from "faker";
import { getModelToken } from "@nestjs/mongoose";

const { fn, clearAllMocks, mock } = jest;
const { alphaNumeric } = random;
const recipe = recipeFactory.getOne();
const someRecipes = recipeFactory.getSome(3);

describe("RecipeService", function() {
  let model: Model<Recipe>;
  let service: RecipeService;
  const updateArgs = [alphaNumeric(6), recipe, { new: true }];

  describe.each`
    functionName      | dbMethod               | mockData       | args               | expected
    ${"addRecipe"}    | ${"create"}            | ${someRecipes} | ${someRecipes}     | ${someRecipes}
    ${"updateRecipe"} | ${"findByIdAndUpdate"} | ${recipe}      | ${updateArgs}      | ${recipe}
    ${"deleteRecipe"} | ${"findByIdAndRemove"} | ${recipe}      | ${alphaNumeric(6)} | ${recipe}
  `("$functionName", function({
    functionName,
    dbMethod,
    mockData,
    args,
    expected,
  }) {
    beforeEach(async function() {
      const module = await Test.createTestingModule({
        providers: [
          RecipeService,
          {
            provide: getModelToken("Recipe"),
            useValue: {},
          },
        ],
      }).compile();

      service = module.get<RecipeService>(RecipeService);
      model = module.get<Model<Recipe>>(getModelToken("Recipe"));

      model[dbMethod] = fn().mockResolvedValue(mockData);
    });

    it("should return the expected value for the method", async function() {
      expect(await service[functionName](...args)).toEqual(expected);
    });

    it(`should have called model.${dbMethod}`, async function() {
      await service[functionName](...args);

      expect(model[dbMethod]).toHaveBeenCalled();
    });
  });

  describe.each`
    functionName    | dbMethod      | mockData       | args               | expected
    ${"allRecipes"} | ${"find"}     | ${someRecipes} | ${[]}              | ${someRecipes}
    ${"aRecipe"}    | ${"findById"} | ${recipe}      | ${alphaNumeric(6)} | ${recipe}
  `("$functionName", function({
    functionName,
    dbMethod,
    mockData,
    args,
    expected,
  }) {
    beforeEach(async function() {
      const module = await Test.createTestingModule({
        providers: [
          RecipeService,
          {
            provide: getModelToken("Recipe"),
            useValue: {},
          },
        ],
      }).compile();

      service = module.get<RecipeService>(RecipeService);
      model = module.get<Model<Recipe>>(getModelToken("Recipe"));

      model[dbMethod] = fn().mockReturnValue({
        exec: fn().mockResolvedValue(mockData),
      });
    });

    it("should return the expected value for the method", async function() {
      expect(await service[functionName](...args)).toEqual(expected);
    });

    it(`should have called model.${dbMethod}`, async function() {
      await service[functionName](...args);

      expect(model[dbMethod]).toHaveBeenCalled();
    });
  });

  describe("filterRecipes", function() {
    const titleFilter = { search: someRecipes[0].title };
    const categoryFilter = { category: someRecipes[1].category };

    beforeEach(async function() {
      const module = await Test.createTestingModule({
        providers: [
          RecipeService,
          {
            provide: getModelToken("Recipe"),
            useValue: {},
          },
        ],
      }).compile();

      service = module.get<RecipeService>(RecipeService);

      service.allRecipes = fn().mockResolvedValue(someRecipes);
    });

    it("should call allRecipes method", async function() {
      await service.filterRecipes();

      expect(service.allRecipes).toHaveBeenCalled();
    });

    it.each`
      title                       | args              | expectation
      ${"no filters are applied"} | ${{}}             | ${"toEqual"}
      ${"searching the title"}    | ${titleFilter}    | ${"toBeLessThan"}
      ${"searching a category"}   | ${categoryFilter} | ${"toBeLessThan"}
    `("when $title, result.length is expected $expectation 3", async function({
      args,
      expectation,
    }) {
      const result = await service.filterRecipes(args);

      expect(result.length)[expectation](3);
    });
  });
});
