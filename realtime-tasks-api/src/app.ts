import { AppRoutes } from "./presentation/routes/router";
import { ServerApp } from "./presentation/server"


(() => {
    main()
})()

function main(): void{
    const serverApp = new ServerApp(3000, AppRoutes.router());
    serverApp.start()
}