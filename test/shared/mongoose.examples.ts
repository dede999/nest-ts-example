const { fn } = jest;

export const exampleWithoutExec = function(
  functionName,
  dbMethod,
  mock,
  args,
  expectedValue,
) {
  const model = {};
  beforeEach(() => {
    model[dbMethod] = fn().mockResolvedValue(mock);
  });

  it(`should have called model.${dbMethod}`, async () => {
    await functionName(args);

    expect(model[dbMethod]).toHaveBeenCalledWith(args);
  });

  it("should return the expected value", async () => {
    expect(await functionName).toEqual(expectedValue);
  });
};
