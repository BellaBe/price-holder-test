import assert from 'assert';
import PriceHolder from "./src/index";

function testGetPrice () {
    const ph = new PriceHolder(5)
    ph.putPrice('a', 1)
    ph.putPrice('a', 2)
    ph.putPrice('b', 3)
  
    assert.strict.equal(ph.getPrice('a'), 2)
    assert.strict.equal(ph.getPrice('b'), 3)
  }
  
  function testRollingAverage () {
    const ph = new PriceHolder(4)
    ph.putPrice('a', 1)
    ph.putPrice('a', 2)
    ph.putPrice('a', 1)
    ph.putPrice('a', 2)
    assert.strict.equal(ph.getAverage('a'), 1.5)
  }
  
  async function testWaitForNextPrice () {
    const ph = new PriceHolder(3)
    setTimeout(() => {
      ph.putPrice('a', 42)
    }, 100)
  
    let value = await ph.waitForNextPrice('a')
    assert.strict.equal(value, 42)
  }
  
  async function testSubscribe () {
    const ph = new PriceHolder(4)
    const values = [1, 2, 3]
    const putNext = () => {
      setTimeout(() => {
        const next = values.shift()
        if (next === undefined) return
  
        ph.putPrice('a', next)
        putNext()
      }, 100)
    }
  
    putNext()
  
    // TODO: Subscribe to price changes, add assertions, and unsubscribe when done.
  }
  
  testGetPrice();

  testRollingAverage();

  (async() => {
    await testWaitForNextPrice()
  })()
  