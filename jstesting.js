let i = 0;
let a = [];
(async function () {
    async function test () {
        a.push(i);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        i++;
        console.log(i);
        i < 5 ? await test() : "";
        
    }
    
    await test();
    console.log(a);
    
    
})();