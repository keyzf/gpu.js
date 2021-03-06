function buildToStringKernelResult(mode) {
  const gpu = new GPU({ mode });
  const kernel = gpu.createKernel(function() {
    return 1;
  }, {
    output: [1]
  });
  kernel.build();
  const string = kernel.toString();
  if (mode === 'cpu') {
    console.log(string);
  }
  const kernel2 = eval(string)();
  return kernel2
    .setWebGl(kernel._webGl)
    .setCanvas(kernel._canvas)();
}

QUnit.test('Issue #263 toString single function - auto', () => {
  QUnit.assert.equal(buildToStringKernelResult()[0], 1);
});

QUnit.test('Issue #263 toString single function - gpu', () => {
  QUnit.assert.equal(buildToStringKernelResult('gpu')[0], 1);
});

QUnit.test('Issue #263 toString single function - cpu', () => {
  QUnit.assert.equal(buildToStringKernelResult('cpu')[0], 1);
});