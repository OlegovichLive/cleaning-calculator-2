import React, { useEffect, useMemo, useState } from "react";

// (вставь здесь весь твой код компонента — как в сообщении пользователя)
const PRICE_DATA = {
  "areas": [20,30,40,50,60,70,80,90,100,110,120,130,140,150,160,170,180,190,200],
  "base_prices": {
    "20": {"Поддерживающая":2090,"Генеральная":9990,"После ремонта":10490},
    "30": {"Поддерживающая":2990,"Генеральная":10990,"После ремонта":11990},
    "40": {"Поддерживающая":3290,"Генеральная":11990,"После ремонта":13490},
    "50": {"Поддерживающая":3590,"Генеральная":12990,"После ремонта":14990},
    "60": {"Поддерживающая":3890,"Генеральная":13990,"После ремонта":16490},
    "70": {"Поддерживающая":4190,"Генеральная":14990,"После ремонта":17990},
    "80": {"Поддерживающая":4490,"Генеральная":15990,"После ремонта":19490},
    "90": {"Поддерживающая":4790,"Генеральная":16990,"После ремонта":20990},
    "100": {"Поддерживающая":5090,"Генеральная":17990,"После ремонта":22490},
    "110": {"Поддерживающая":5790,"Генеральная":24490,"После ремонта":26490},
    "120": {"Поддерживающая":6290,"Генеральная":25990,"После ремонта":28490},
    "130": {"Поддерживающая":6790,"Генеральная":27490,"После ремонта":30490},
    "140": {"Поддерживающая":7290,"Генеральная":28990,"После ремонта":32490},
    "150": {"Поддерживающая":7790,"Генеральная":30490,"После ремонта":34490},
    "160": {"Поддерживающая":8290,"Генеральная":31990,"После ремонта":36490},
    "170": {"Поддерживающая":8790,"Генеральная":33490,"После ремонта":38490},
    "180": {"Поддерживающая":9290,"Генеральная":34990,"После ремонта":40490},
    "190": {"Поддерживающая":9790,"Генеральная":36490,"После ремонта":42490},
    "200": {"Поддерживающая":10290,"Генеральная":37990,"После ремонта":44490}
  },
  "addons": [
    {"name":"Створка окна (стандартное - мойка)","unit":"створ","price":{"Поддерживающая":500,"Генеральная":500,"После ремонта":500},"quantityInput":true},
    {"name":"Створка окна (панорамное - мойка)","unit":"створ","price":{"Поддерживающая":800,"Генеральная":800,"После ремонта":800},"quantityInput":true},
    {"name":"Мытьё лотка питомца","unit":"шт","price":{"Поддерживающая":500,"Генеральная":500,"После ремонта":500},"quantityInput":false},
    {"name":"Доставка","price":{"Поддерживающая":1500,"Генеральная":0,"После ремонта":0},"quantityInput":false},
    {"name":"Что-то еще","unit":"час","price":{"Поддерживающая":1000,"Генеральная":1000,"После ремонта":1000},"quantityInput":true},
    {"name":"Мойка холодильника внутри","unit":"шт","price":{"Поддерживающая":800,"Генеральная":800,"После ремонта":800},"quantityInput":false},
    {"name":"Мытьё кухонных шкафов изнутри","unit":"шт","price":{"Поддерживающая":500,"Генеральная":500,"После ремонта":500},"quantityInput":true},
    {"name":"Уборка на балконе","unit":"30 мин","price":{"Поддерживающая":500,"Генеральная":500,"После ремонта":500},"quantityInput":true},
    {"name":"Мытьё посуды","unit":"30 мин","price":{"Поддерживающая":500,"Генеральная":500,"После ремонта":500},"quantityInput":true},
    {"name":"Глажка","unit":"30 минут","price":{"Поддерживающая":400,"Генеральная":400,"После ремонта":400},"quantityInput":true},
    {"name":"Окна/балкон (комплекс)","unit":"комплекс","price":{"Поддерживающая":4500,"Генеральная":4500,"После ремонта":4500},"quantityInput":false},
    {"name":"Окна+балкон (комплекс)","unit":"комплекс","price":{"Поддерживающая":7500,"Генеральная":7500,"После ремонта":7500},"quantityInput":false}
  ]
};

const TYPES = ["Поддерживающая", "Генеральная", "После ремонта"];

export default function CleaningCalculator() {
  const [type, setType] = useState(TYPES[0]);
  const [area, setArea] = useState(PRICE_DATA.areas[0]);
  const [selectedAddons, setSelectedAddons] = useState({});

  useEffect(() => {
    // initialize default quantities to 1 for addons
    const init = {};
    PRICE_DATA.addons.forEach(a => {
      init[a.name] = { checked: false, qty: a.quantityInput ? 1 : 1 };
    });
    setSelectedAddons(init);
  }, []);

  function toggleAddon(name) {
    setSelectedAddons(prev => ({ ...prev, [name]: { ...prev[name], checked: !prev[name].checked } }));
  }

  function setQty(name, qty) {
    const q = Math.max(0, Math.floor(Number(qty) || 0));
    setSelectedAddons(prev => ({ ...prev, [name]: { ...prev[name], qty: q } }));
  }

  const basePrice = useMemo(() => {
    const p = PRICE_DATA.base_prices[area];
    return p ? p[type] || 0 : 0;
  }, [area, type]);

  const addonsTotal = useMemo(() => {
    return PRICE_DATA.addons.reduce((sum, a) => {
      const sel = selectedAddons[a.name];
      if (!sel || !sel.checked) return sum;
      const price = (a.price && a.price[type]) ? a.price[type] : 0;
      const qty = a.quantityInput ? (sel.qty || 0) : (sel.qty || 1);
      return sum + price * qty;
    }, 0);
  }, [selectedAddons, type]);

  const total = basePrice + addonsTotal;
  const withDiscount = Math.round(total * 0.85);

  return (
    <div className="min-h-screen bg-white text-gray-900 p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Калькулятор стоимости уборки</h1>

        <section className="mb-4">
          <div className="flex gap-2">
            {TYPES.map(t => (
              <button key={t} onClick={() => setType(t)}
                className={`px-4 py-2 rounded-2xl border ${type===t? 'bg-blue-600 text-white':'bg-white'}`}>
                {t}
              </button>
            ))}
          </div>
        </section>

        <section className="mb-4">
          <div className="flex flex-wrap gap-2">
            {PRICE_DATA.areas.map(a => (
              <button key={a} onClick={() => setArea(a)} className={`px-3 py-2 rounded-2xl border ${area===a? 'bg-gray-900 text-white':'bg-white'}`}>
                {a} м²
              </button>
            ))}
          </div>
        </section>

        <section className="mb-4">
          <h2 className="font-semibold mb-2">Дополнительные опции</h2>
          <div className="grid grid-cols-1 gap-2">
            {PRICE_DATA.addons.map(a => {
              const sel = selectedAddons[a.name] || { checked:false, qty:1 };
              const priceForType = a.price && a.price[type] ? a.price[type] : 0;
              return (
                <div key={a.name} className="flex items-center gap-3 p-2 border rounded">
                  <label className="flex items-center gap-2 flex-1">
                    <input type="checkbox" checked={sel.checked} onChange={() => toggleAddon(a.name)} />
                    <div>
                      <div className="font-medium">{a.name}</div>
                      <div className="text-sm opacity-70">{a.unit} — {priceForType ? `${priceForType} ₽` : 'входит в услугу / 0 ₽'}</div>
                    </div>
                  </label>
                  {a.quantityInput && sel.checked && (
                    <div className="flex items-center gap-2">
                      <input type="number" min={0} value={sel.qty} onChange={e=>setQty(a.name,e.target.value)} className="w-20 px-2 py-1 border rounded text-right" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        <section className="mb-4 p-4 rounded border bg-gray-50">
          <div className="flex justify-between mb-2">
            <div>Базовая цена ({area} м², {type})</div>
            <div className="font-medium">{basePrice.toLocaleString()} ₽</div>
          </div>
          <div className="flex justify-between mb-2">
            <div>Дополнительные опции</div>
            <div className="font-medium">{addonsTotal.toLocaleString()} ₽</div>
          </div>
          <hr className="my-2" />
          <div className="flex justify-between text-lg font-bold">
            <div>Итого</div>
            <div>{total.toLocaleString()} ₽</div>
          </div>
          <div className="flex justify-between text-sm opacity-80 mt-2">
            <div>Цена со скидкой 15%</div>
            <div>{withDiscount.toLocaleString()} ₽</div>
          </div>
        </section>

      
      </div>
    </div>
  );
}
