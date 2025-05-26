import { ServerApp } from "./presentation/server"


(() => {
    main()
})()

function main(): void{
    const serverApp = new ServerApp();
    serverApp.start()
}