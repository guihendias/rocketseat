import React from "react";
import ReactDOM from "react-dom/client";
import { createServer, Model } from "miragejs";
import { App } from "./App";

createServer({
  models: {
    transaction: Model
  },

  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: "Salário",
          category: "Categoria",
          value: 1000,
          type: "deposit",
          createdAt: new Date()
        },
        {
          id: 2,
          title: "Alimentação",
          category: "Categoria",
          value: -100,
          type: "withdraw",
          createdAt: new Date()
        },
        {
          id: 3,
          title: "Lazer",
          category: "Categoria",
          value: -50,
          type: "withdraw",
          createdAt: new Date()
        },
        {
          id: 4,
          title: "Estudos",
          category: "Categoria",
          value: -200,
          type: "withdraw",
          createdAt: new Date()
        },
        {
          id: 5,
          title: "Vestuário",
          category: "Categoria",
          value: -10,
          type: "withdraw",
          createdAt: new Date()
        },
        {
          id: 6,
          title: "Casa",
          category: "Categoria",
          value: -1000,
          type: "withdraw",
          createdAt: new Date()
        },
        {
          id: 7,
          title: "Carro",
          category: "Categoria",
          value: -200,
          type: "withdraw",
          createdAt: new Date()
        },
        {
          id: 8,
          title: "Mercado",
          category: "Categoria",
          value: -100,
          type: "withdraw",
          createdAt: new Date()
        }
      ]
    });
  },

  routes() {
    this.namespace = "api";

    this.get("/transactions", () => {
      return this.schema.all("transaction");
    });

    this.post("transactions", (schema, request) => {
      const data = JSON.parse(request.requestBody);

      return schema.create("transaction", data);
    });
  }
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
