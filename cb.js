function doSomething(cbFn) {
    setTimeout(() => {
        cbFn('done');
    }, 1000);
}

function doLater(status) {
    console.log(status);
}
doSomething(doLater);

doSomething((status) => {
    console.log(status);
});