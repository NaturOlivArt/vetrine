import { useCart } from "../context/CartContext";
import { useMemo, useState } from "react";

const VOTRE_EMAIL_FORMSUBMIT = "votre-email@example.com"; // <- remplacez par votre email
const VOTRE_NUMERO_WHATSAPP = "52364988"; // <- remplacez par votre numéro sans '+'

function Cart() {
  const { items, updateQty, removeItem, clear, count } = useCart();

  const cartText = useMemo(() => {
    if (items.length === 0) return "Panier vide.";
    const lines = items.map(
      (it, i) =>
        `${i + 1}) ${it.name}${it.size ? ` (${it.size})` : ""} x${it.qty}`
    );
    return `Commande NaturOliv Art:\n${lines.join(
      "\n"
    )}\nTotal articles: ${count}`;
  }, [items, count]);

  const [contactMethod, setContactMethod] = useState("email"); // 'email' | 'whatsapp'

  const handleWhatsApp = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const nom = formData.get("nom") || "";
    const email = formData.get("email") || "";
    const phone = formData.get("phone") || "";
    const message = formData.get("message") || "";

    const finalText =
      `${cartText}\n\n` +
      `Nom: ${nom}\nEmail: ${email}\nTéléphone: ${phone}\n` +
      `Message: ${message}`;

    const url = `https://wa.me/${VOTRE_NUMERO_WHATSAPP}?text=${encodeURIComponent(
      finalText
    )}`;
    window.open(url, "_blank");
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-6 text-wood-dark dark:text-dark-secondary">
          Votre Panier
        </h1>
        <p>Votre panier est vide.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6 text-wood-dark dark:text-dark-secondary">
        Votre Panier
      </h1>

      {/* Tableau Panier */}
      <div className="bg-white dark:bg-dark-secondary shadow-md rounded-lg overflow-hidden mb-10">
        <table className="w-full">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="py-3 px-4 text-left text-wood-dark dark:text-dark-secondary">Produit</th>
              <th className="py-3 px-4 text-left text-wood-dark dark:text-dark-secondary">Quantité</th>
              <th className="py-3 px-4 text-left text-wood-dark dark:text-dark-secondary">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((it) => (
              <tr key={it.uid} className="border-b dark:border-gray-600">
                <td className="py-3 px-4 flex items-center gap-4">
                  <img
                    src={it.image}
                    alt={it.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div>
                    <h2 className="text-lg font-semibold text-wood-dark dark:text-dark-secondary">
                      {it.name}{" "}
                      {it.size ? (
                        <span className="text-gray-600 text-base">({it.size})</span>
                      ) : null}
                    </h2>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center border rounded w-fit">
                    <button
                      type="button"
                      onClick={() => updateQty(it.uid, Math.max(1, it.qty - 1))}
                      className="px-3 py-1 bg-gray-200 hover:bg-gray-300"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min={1}
                      value={it.qty}
                      onChange={(e) =>
                        updateQty(
                          it.uid,
                          Math.max(1, parseInt(e.target.value || "1", 10))
                        )
                      }
                      className="w-16 text-center border-l border-r dark:bg-dark-secondary"
                    />
                    <button
                      type="button"
                      onClick={() => updateQty(it.uid, it.qty + 1)}
                      className="px-3 py-1 bg-gray-200 hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => removeItem(it.uid)}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                  >
                    Retirer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Total */}
      <div className="mb-6 flex items-center justify-between">
        <p className="text-lg dark:text-gray-200">
          Total articles: <span className="font-semibold">{count}</span>
        </p>
        <button
          onClick={clear}
          className="text-sm text-red-600 hover:underline"
        >
          Vider le panier
        </button>
      </div>

      {/* Formulaire */}
      <h2 className="text-2xl font-bold mb-4 text-wood-dark dark:text-dark-secondary">
        Vos informations
      </h2>

      <form
        action={`https://formsubmit.co/${VOTRE_EMAIL_FORMSUBMIT}`}
        method="POST"
        onSubmit={contactMethod === "whatsapp" ? handleWhatsApp : undefined}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white dark:bg-dark-secondary p-6 rounded shadow"
      >
        <input
          type="hidden"
          name="_subject"
          value="Nouvelle commande NaturOliv Art"
        />
        <input type="hidden" name="_template" value="table" />
        <input type="hidden" name="panier" value={cartText} />

        <div className="md:col-span-2 flex gap-6 mb-2">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="contactMethod"
              value="email"
              checked={contactMethod === "email"}
              onChange={() => setContactMethod("email")}
            />
            <span className="dark:text-gray-200">Envoyer par Email</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="contactMethod"
              value="whatsapp"
              checked={contactMethod === "whatsapp"}
              onChange={() => setContactMethod("whatsapp")}
            />
            <span className="dark:text-gray-200">Envoyer par WhatsApp</span>
          </label>
        </div>

        <div>
          <label className="block text-sm mb-1 dark:text-gray-200">Nom</label>
          <input
            name="nom"
            required
            className="w-full border rounded px-3 py-2 dark:bg-gray-800 dark:text-gray-200"
          />
        </div>
        <div>
          <label className="block text-sm mb-1 dark:text-gray-200">Email</label>
          <input
            name="email"
            type="email"
            required={contactMethod === "email"}
            className="w-full border rounded px-3 py-2 dark:bg-gray-800 dark:text-gray-200"
          />
        </div>
        <div>
          <label className="block text-sm mb-1 dark:text-gray-200">Téléphone</label>
          <input
            name="phone"
            className="w-full border rounded px-3 py-2 dark:bg-gray-800 dark:text-gray-200"
          />
        </div>
        <div>
          <label className="block text-sm mb-1 dark:text-gray-200">Message</label>
          <textarea
            name="message"
            rows="4"
            className="w-full border rounded px-3 py-2 dark:bg-gray-800 dark:text-gray-200"
          />
        </div>

        <div className="md:col-span-2">
          {contactMethod === "email" ? (
            <button
              type="submit"
              className="bg-wood-dark text-white px-6 py-3 rounded hover:bg-opacity-90"
            >
              Envoyer la commande par Email
            </button>
          ) : (
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700"
            >
              Ouvrir WhatsApp et envoyer
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default Cart;
