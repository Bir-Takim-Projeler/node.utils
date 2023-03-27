
import * as modules from "../src"



describe("Testing awaiter (whenResolve) module ", () => {

    beforeEach(()=> {
       
    })

    it("should defined", ()=> {
        
        expect(modules.whenResolve).toBeDefined()
    })


    it("should take promise as first arg and return a [undefined, promise] when resolve", async () => {

      expect(modules.whenResolve(Promise.resolve("hello"))).resolves.toMatchObject([undefined, "hello"])
     
    })

    it("should return error instead reject promise" , () => {
        expect(modules.whenResolve(Promise.reject("hello"))).not.toThrowError
        expect(modules.whenResolve(Promise.reject("hello"))).toBeTruthy
    })

    it("should override errors", ()=> {
        expect(modules.whenResolve(Promise.reject("hello"), {
            error: new Error("world")
        })).resolves.toMatchObject([new Error("world"), undefined])
    })
})