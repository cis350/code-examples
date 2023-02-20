/* eslint-disable no-console */

const p = new Promise((resolve, reject) => {
  const c = parseInt(Math.random() * 100, 10);
  console.log('c', c);
  if (c % 2 === 0) resolve('fulfilled! c is even!');
  else reject(new Error('c is not even!'));
});

// then syntax
p.then(((value) => console.log(value),
(reason) => console.log(reason)));

// then-catch syntax
p.then((value) => console.log(value))
  .catch((reason) => console.log(reason));

// async-await syntax
const f = async () => {
  try {
    const val = await p;
    console.log('success', val);
  } catch (e) {
    console.log('error', e.message);
  }
};

f();
