import React, { useEffect, useMemo, useState } from "react";

// (вставь здесь весь твой код компонента — как в сообщении пользователя)
const PRICE_DATA = {
  "areas": [20,30,40,50,60,70,80,90,100,110,120,130,140,150,160,170,180,190,200],
  "base_prices": {
    "20": {"Поддерживающая":3690,"Генеральная":12490, "Генеральная ЛАЙТ":7200, "После ремонта":13990},
    "30": {"Поддерживающая":3690,"Генеральная":12490,"Генеральная ЛАЙТ":7200,"После ремонта":13990},
    "40": {"Поддерживающая":3890,"Генеральная":13990,"Генеральная ЛАЙТ":7200, "После ремонта":15490},
    "50": {"Поддерживающая":4090,"Генеральная":15490,"Генеральная ЛАЙТ":9000,"После ремонта":16990},
    "60": {"Поддерживающая":4290,"Генеральная":16990,"Генеральная ЛАЙТ":10800,"После ремонта":18490},
    "70": {"Поддерживающая":4490,"Генеральная":18490,"Генеральная ЛАЙТ":12600,"После ремонта":19990},
    "80": {"Поддерживающая":4690,"Генеральная":19990,"Генеральная ЛАЙТ":14400,"После ремонта":21490},
    "90": {"Поддерживающая":4890,"Генеральная":21490,"Генеральная ЛАЙТ":16200,"После ремонта":22990},
    "100": {"Поддерживающая":5290,"Генеральная":22490,"Генеральная ЛАЙТ":18000,"После ремонта":24490},
    "110": {"Поддерживающая":5740,"Генеральная":23490,"Генеральная ЛАЙТ":19800,"После ремонта":25990},
    "120": {"Поддерживающая":6190,"Генеральная":24490,"Генеральная ЛАЙТ":21600,"После ремонта":27490},
    "130": {"Поддерживающая":6640,"Генеральная":25490,"Генеральная ЛАЙТ":23400,"После ремонта":28990},
    "140": {"Поддерживающая":7090,"Генеральная":26490,"Генеральная ЛАЙТ":25200,"После ремонта":30490},
    "150": {"Поддерживающая":7540,"Генеральная":27490,"Генеральная ЛАЙТ":27000,"После ремонта":31990},
    "160": {"Поддерживающая":7990,"Генеральная":28490,"Генеральная ЛАЙТ":28800,"После ремонта":33490},
    "170": {"Поддерживающая":8440,"Генеральная":29490,"Генеральная ЛАЙТ":30600,"После ремонта":34990},
    "180": {"Поддерживающая":8890,"Генеральная":30490,"Генеральная ЛАЙТ":32400,"После ремонта":36490},
    "190": {"Поддерживающая":9340,"Генеральная":31490,"Генеральная ЛАЙТ":34200,"После ремонта":37990},
    "200": {"Поддерживающая":9790,"Генеральная":32490,"Генеральная ЛАЙТ":36000,"После ремонта":39490}
  },
  "addons": [
    {"name":"Створка окна изнутри (стандартное - мойка)","unit":"створ","price":{"Поддерживающая":500,"Генеральная":500,"Генеральная ЛАЙТ":500, "После ремонта":500},"quantityInput":true},
    {"name":"Створка окна с обеих сторон (стандартное - мойка)","unit":"створ","price":{"Поддерживающая":750,"Генеральная":750,"Генеральная ЛАЙТ":750,"После ремонта":750},"quantityInput":true},
    {"name":"Створка окна (панорамное - мойка)","unit":"створ","price":{"Поддерживающая":800,"Генеральная":800,"Генеральная ЛАЙТ":800,"После ремонта":800},"quantityInput":true},
    {"name":"Мытьё лотка питомца","unit":"шт","price":{"Поддерживающая":500,"Генеральная":500,"Генеральная ЛАЙТ":500,"После ремонта":500},"quantityInput":false},
    {"name":"Доставка","price":{"Поддерживающая":1500,"Генеральная":0,"Генеральная ЛАЙТ":1500,"После ремонта":0},"quantityInput":false},
    {"name":"Что-то еще","unit":"час","price":{"Поддерживающая":1000,"Генеральная":1000,"Генеральная ЛАЙТ":1000,"После ремонта":1000},"quantityInput":true},
    {"name":"Мойка холодильника внутри","unit":"шт","price":{"Поддерживающая":800,"Генеральная":800,"Генеральная ЛАЙТ":800,"После ремонта":800},"quantityInput":false},
    {"name":"Мытьё кухонных шкафов изнутри","unit":"шт","price":{"Поддерживающая":500,"Генеральная":500,"Генеральная ЛАЙТ":500,"После ремонта":500},"quantityInput":true},
    {"name":"Мытьё СВЧ изнутри","unit":"шт","price":{"Поддерживающая":500,"Генеральная":0,"Генеральная ЛАЙТ":500,"После ремонта":0},"quantityInput":true},
    {"name":"Мытьё духовки изнутри","unit":"шт","price":{"Поддерживающая":500,"Генеральная":0,"Генеральная ЛАЙТ":500,"После ремонта":0},"quantityInput":true},
    {"name":"Уборка на балконе","unit":"30 мин","price":{"Поддерживающая":500,"Генеральная":500,"Генеральная ЛАЙТ":500,"После ремонта":500},"quantityInput":true},
    {"name":"Мытье окон на балконе","unit":"шт","price":{"Поддерживающая":3000,"Генеральная":3000,"Генеральная ЛАЙТ":3000,"После ремонта":3000},"quantityInput":true},
    {"name":"Мытьё посуды","unit":"30 мин","price":{"Поддерживающая":500,"Генеральная":500,"Генеральная ЛАЙТ":500,"После ремонта":500},"quantityInput":true},
    {"name":"Глажка","unit":"30 минут","price":{"Поддерживающая":400,"Генеральная":400,"Генеральная ЛАЙТ":400,"После ремонта":400},"quantityInput":true},
    {"name":"Окна или балкон (комплекс)","unit":"комплекс","price":{"Поддерживающая":4500,"Генеральная":4500,"Генеральная ЛАЙТ":4500,"После ремонта":4500},"quantityInput":false},
    {"name":"Окна+балкон (комплекс)","unit":"комплекс","price":{"Поддерживающая":7500,"Генеральная":7500,"Генеральная ЛАЙТ":7500,"После ремонта":7500},"quantityInput":false},
     {"name":"make jul great again","unit":"GREAT ","price":{"Поддерживающая":1000000,"Генеральная":1000000,"Генеральная ЛАЙТ":1000000,"После ремонта":1000000},"quantityInput":true}
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
  const withReact = Math.round(total * 0.95);

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
          <div className="flex justify-between text-sm opacity-80 mt-2">
            <div>Цена со скидкой 5%</div>
            <div>{withReact.toLocaleString()} ₽</div>
          </div>
        </section>

      
      </div>
    </div>
  );
}
