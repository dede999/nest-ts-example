import { RecipeService } from "./recipe.service";
import { Recipe, recipeFactory } from "./interfaces/recipe.interface";
import { Test } from "@nestjs/testing";
import { Model } from "mongoose"
import { getModelToken } from "@nestjs/mongoose";

const { fn, clearAllMocks } = jest;
const aRecipe = recipeFactory.getOne()
const someRecipes = recipeFactory.getSome(3)

describe("RecipeService", () => {
  let service: RecipeService;
  let model: Model<Recipe>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        RecipeService,
        {
          provide: getModelToken('Recipe'),
          useValue: {
            new: fn(),
            constructor: fn(),
            find: fn(),
            findOne: fn(),
            update: fn(),
            create: fn(),
            remove: fn(),
            exec: fn(),
          }
        }
      ]
    }).compile()
    //
    service = module.get<RecipeService>(RecipeService)
    model = module.get<Model<Recipe>>(getModelToken('Recipe'));
  })

  afterAll(() => clearAllMocks())

  describe("filterRecipes", () => {
    beforeEach(() => {
      service.allRecipes = fn().mockResolvedValue(someRecipes)
    })

    it("should return all recipes with no given filters" , async () => {
      expect(await service.filterRecipes()).toEqual(someRecipes)
    })

    it("should return all recipes that has an specific word", async () => {
      const filterWithSearch = { search: someRecipes[0].title.split(' ')[0] }
      const result = await service.filterRecipes(filterWithSearch)

      expect(result.length).toBeLessThan(3)
    })

    it("should return all recipes with an specific category", async () => {
      const filterWithCategory = { category: someRecipes[1].category }
      const result = await service.filterRecipes(filterWithCategory)

      expect(result.length).toBeLessThan(3)
    })

    it("should have called allRecipes method",  async () => {
      await service.filterRecipes()

      expect(service.allRecipes).toHaveBeenCalled()
    });
  })

  describe("allRecipes", () => {
    beforeEach(() => {
      model.find = fn().mockReturnValue({
        exec: fn().mockResolvedValue(someRecipes)
      })
    })

    it("should return the array of recipes", async () => {
      expect(await service.allRecipes()).toEqual(someRecipes)
    });

    it("should have called find", async () => {
      await service.allRecipes()

      expect(model.find).toHaveBeenCalled()
    })
  })
})
