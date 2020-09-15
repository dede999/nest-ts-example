import { RecipeController } from "./recipe.controller";
import { RecipeService } from "./recipe.service";
import { Test } from "@nestjs/testing";
import { recipeFactory } from "./interfaces/recipe.interface";
import { getModelToken } from "@nestjs/mongoose";
import { random } from "faker";

const { fn, clearAllMocks, spyOn } = jest;
const { alphaNumeric } = random;
const recipe = recipeFactory.getOne();
const someRecipes = recipeFactory.getSome(3);

describe("RecipeController", function() {
  let controller: RecipeController;
  let service: RecipeService;

  afterAll(function() {
    clearAllMocks();
  });

  describe.each`
    controllerName    | serviceName        | mockData       | args                         | expected
    ${"addRecipe"}    | ${"addRecipe"}     | ${recipe}      | ${someRecipes}               | ${recipe}
    ${"allRecipes"}   | ${"filterRecipes"} | ${someRecipes} | ${{}}                        | ${someRecipes}
    ${"someRecipe"}   | ${"aRecipe"}       | ${recipe}      | ${alphaNumeric(6)}           | ${recipe}
    ${"updateRecipe"} | ${"updateRecipe"}  | ${recipe}      | ${[alphaNumeric(6), recipe]} | ${recipe}
    ${"deleteRecipe"} | ${"deleteRecipe"}  | ${true}        | ${alphaNumeric(6)}           | ${true}
  `("$controllerName", function({
    controllerName,
    serviceName,
    mockData,
    args,
    expected,
  }) {
    beforeEach(async function() {
      const module = await Test.createTestingModule({
        controllers: [RecipeController],
        providers: [
          RecipeService,
          {
            provide: getModelToken("Recipe"),
            useValue: {},
          },
        ],
      }).compile();

      service = module.get<RecipeService>(RecipeService);
      controller = module.get<RecipeController>(RecipeController);

      service[serviceName] = fn().mockResolvedValue(mockData);
    });

    it(`should return the expected value for the ${controllerName} method`, async function() {
      expect(await controller[controllerName](args)).toEqual(expected);
    });

    it(`should have called service.${serviceName}`, async function() {
      await controller[controllerName](args);

      expect(service[serviceName]).toHaveBeenCalled();
    });
  });
});
