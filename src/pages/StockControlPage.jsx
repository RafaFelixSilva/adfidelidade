import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function StockControlPage() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: "", category: "", quantity: "" });

  // 🔹 Busca os itens no Supabase
  useEffect(() => {
    fetchItems();
  }, []);

  async function fetchItems() {
    const { data, error } = await supabase.from("stock_items").select("*").order("category", { ascending: true });
    if (error) console.error(error);
    else setItems(data);
  }

  // 🔹 Adiciona novo item
  async function addItem(e) {
    e.preventDefault();
    const { error } = await supabase.from("stock_items").insert([newItem]);
    if (!error) {
      setNewItem({ name: "", category: "", quantity: "" });
      fetchItems();
    }
  }

  // 🔹 Exclui item
  async function deleteItem(id) {
    const { error } = await supabase.from("stock_items").delete().eq("id", id);
    if (!error) fetchItems();
  }

  return (
    <main className="max-w-5xl mx-auto bg-white shadow p-6 rounded-lg">
      <h2 className="text-2xl font-bold text-blue-700 mb-6">Controle de Estoque</h2>

      {/* Formulário de novo item */}
      <form onSubmit={addItem} className="flex flex-col md:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder="Nome do item"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          className="border p-2 rounded flex-1"
          required
        />
        <select
          value={newItem.category}
          onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
          className="border p-2 rounded flex-1"
          required
        >
          <option value="">Selecione categoria</option>
          <option value="Cozinha">Cozinha</option>
          <option value="Limpeza">Limpeza</option>
          <option value="Instrumentos">Instrumentos</option>
          <option value="Outros">Outros</option>
        </select>
        <input
          type="number"
          placeholder="Quantidade"
          value={newItem.quantity}
          onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
          className="border p-2 rounded w-32"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Adicionar
        </button>
      </form>

      {/* Lista de itens */}
      <div className="overflow-x-auto w-full">
        <table className="table-auto w-full text-left border-collapse">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3">Item</th>
              <th className="p-3">Categoria</th>
              <th className="p-3">Quantidade</th>
              <th className="p-3">Ações</th>
            </tr>
          </thead>
          <tbody>
            {items.length > 0 ? (
              items.map((item) => (
                <tr key={item.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{item.name}</td>
                  <td className="p-3">{item.category}</td>
                  <td className="p-3">{item.quantity}</td>
                  <td className="p-3 flex gap-2">
                    <button
                      onClick={() => deleteItem(item.id)}
                      className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-4 text-center text-gray-500">
                  Nenhum item cadastrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
