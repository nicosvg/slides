# Property based testing
## Example based testing

![[Pasted image 20250520105229.png]]
##  Property based testing: how does it work?
Comes from functional programming world (Haskell)

![[Pasted image 20250520105624.png]]

A property is an input-independent rule

Shrinking allows easy reproduction
# Test examples
## Reverse function
Function `reverse(string)`

What can be a property?

- reverse(reverse(string)) = string
- reverse(string).length = string.length
# Some properties examples
1. Round-tripping/Symmetry
![[Pasted image 20250520111922.png]]
2. Invariants
![[Pasted image 20250520111952.png]]
- The size of a list should not change after a map operation.
- The contents of a list should not change after a sort operation.
- The height or depth of something in proportion to size (eg. after balancing trees).

3. Idempotence
![[Pasted image 20250520112038.png]]
4. Induction
Check for a smaller problem

5. Check that every 2 numbers comply with num0 < num1 ([_Easy-to-verify_](https://blog.ssanj.net/posts/2016-06-26-property-based-testing-patterns.html?ref=unzip.dev#blackbox-testinghard-to-prove-easy-to-verify)).

# When can it be useful?
To test pure functions

When the state space gets big: example tests get converted to PBTs when we go from two independent variables (i.e. scenarios AA, AB, BA and BB) to three — AAA, AAB, ABA, ABB, etc. is too many examples to be readable

The input space is large and it's business-important to get it right: often these are compliance-related, but can also be like canonicalizing values or handling untrusted input
# Typescript lib: fast-check

4.5 stars on GitHub
2M+ weekly downloads on npm

## Tuto
Clone the repo

Create an example based test
Did it find any error?

Create a property based test
## The Anatomy of a fast-check Test

Before looking at the test example, let’s break down what a `fast-check` test is composed of. There are four main elements:

### fc.assert

`fc.assert` wraps your entire test, takes a property and executes it. It also - throws automatically in case of failure and formats the thrown errors.

```typescript
function assert<Ts>(property: IProperty<Ts>, params?: Parameters<Ts>): void;
```

### fc.property

`fc.property` - A property is composed of arbitrary generators and a predicate. Arbitrary generators is what generate your test input data, and the predicate is where you assert the validity of your test.

```typescript
fc.property(...arbitraries, (...args) => {});
```

[

### fc.arbitraries
https://fast-check.dev/docs/core-blocks/arbitraries/

`fast-check` provides a bunch of useful utilities to generate any type of data. This is what they call arbitraries.

To name a few:

- Primitives - `fs.boolean`, `fc.date`, `fc.string`, `fc.integer`
- Composites - `fc.tuple`, `fc.array`, `fc.uniqueArray`, `fc.func`, `fc.dictionary`, `fc.record`, `fc.object`, `fc.anything`

Whatever data you need to generate for your test, chances are `fast-check` has a utility to help you do so. You can also create your own custom property if you need to generate custom data that `fast-check` doesn’t support.

### 

The predicate

The predicate is where our test logic actually lies, you can either call your assertions as you’re used to with your testing framework or return a `boolean` value that indicates whether the test should pass or fail.

```
fc.assert(
        fc.property(fc.array(fc.integer()), (data) => {
            const sortedData = sortNumbersAscending(data);
            for (let i = 1; i < data.length; ++i) {
            expect(sortedData[i - 1]).toBeLessThanOrEqual(sortedData[i]);
        }
    }),
);
```
# Real bug examples
https://fast-check.dev/docs/introduction/track-record/

# Tradeoffs

You can’t talk about property based testing without talking about some of the tradeoffs it has. The main three are:

1. **Complexity** - it is harder to construct a property based test, it will take more time and require more thought to think about what properties you’d like to test.
2. **Execution time** - property based tests will increase your test execution time. You can play with the number of runs to reduce the time it takes to run or add parallelism in your CI to handle the additional tests
3. **Relying on programmatic logic** - you’re always relying on some programmatic logic to assert your tests, this means that a mistake in the logic could cause false positives or false negatives.

In contrary to example based tests, where you can rely on hard-coded examples you know are right. It can definitely be beneficial to have this confidence in cases where it’s hard to verify correctness solely based on programmatic logic.

So feel free to mix Property Based Testing with Example Based Testing