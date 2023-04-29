const SaveLocalList = (tmpList, where) => {
    if (where === 0) {
        window.localStorage.setItem('prodList', JSON.stringify(tmpList))
    }

    if (where === 1) {
        window.localStorage.setItem('prodListTmp', JSON.stringify(tmpList))
    }

    if (where === 2) {
        window.localStorage.setItem('prodList', JSON.stringify(tmpList))
        window.localStorage.setItem('prodListTmp', JSON.stringify(tmpList))
    }
}

export const AddLocalProd = (prod) => {
    const { id, name, price } = prod;
    const amount = 0;
    const sale = { id, name, price, amount };
    console.log("🚀 ~ file: localData.js:46 ~ AddLocalProd ~ sale:", sale)

    const list = GetProdsData()
    console.log("🚀 ~ file: localData.js:66 ~ AddLocalProd ~ list:", list)

    if (list.length === 0) {
        sale.amount = 1;
        list.push(sale);
    } else {
        const index = list.findIndex((someSale) => someSale.id === sale.id)
        console.log("🚀 ~ file: localData.js:50 ~ AddLocalProd ~ index:", index)

        if (index !== -1) {
            list[index].amount += 1
        } else {
            sale.amount = 1;
            list.push(sale);
        }
    }

    console.log("🚀 ~ file: localData.js:53 ~ AddLocalProd ~ list:", list)

    SaveLocalList(list, 1)
}

export function GetProdsData() {
    let prodsTmp = null;

    const extistList = window.localStorage.getItem('prodListTmp');

    if (extistList === null) {
        prodsTmp = window.localStorage.getItem('prodList');
    } else {
        prodsTmp = extistList;
    }

    const prods = JSON.parse(prodsTmp)
    return Object.values(prods);
}

export function GetAmountProds() {
    let totalItems = 0;
    const list = GetProdsData()

    list.forEach((value) => {
        totalItems += value.amount
    })

    return totalItems;
}

export function GetIdProds() {
    const map = GetProdsData()
    const list = ([...map.keys()])
    return list
}

export function FormatData(data) {

    const list = data.map((product) => ({
        name: product.name,
        amount: product.amount,
        price: product.price,
    }))

    const prods = list.map((prod) => JSON.stringify(prod))
    return prods
}

export function FormatOrderData(data) {
    const tmpMap = new Map();
    let finalMap = null;

    data.forEach(product => {
        tmpMap.set(product.id, {
            name: product.name,
            amount: product.amount,
            price: product.price,
            send: product.send,
            total: product.total,
        })
    })

    if (tmpMap.size > 0) {
        const tmpList = Array.from(tmpMap)
        finalMap = tmpList.reduce((acc, [key, value]) => {
            acc[key] = value;
            return acc;
        }, {});
    } else {
        finalMap = {}
    }

    return finalMap
}

export function GetLocalUser() {
    const dataUser = window.localStorage.getItem('infoUser');
    const info = JSON.parse(dataUser);
    const { user } = info
    return user
}

export function GetLocalRole() {
    const dataUser = window.localStorage.getItem('infoUser');
    const info = JSON.parse(dataUser);
    const { role } = info
    return role
}

export function UpdateLocalProd(list) {
    window.localStorage.setItem('prodList', JSON.stringify(list))
    window.localStorage.setItem('prodListTmp', JSON.stringify(list))
}

export const ResetLocalData = () => {
    window.localStorage.removeItem('prodListTmp');
    window.localStorage.setItem('prodList', JSON.stringify({}));
    window.localStorage.setItem('infoUser', JSON.stringify({}));
}

// -------------------------------------------------------------------------

export const AddLocalNotifications = (msg, order) => {
    const listNotis = GetLocalNotifications()
    listNotis.push({
        'status': msg,
        'order': order
    })

    window.localStorage.setItem('noti', JSON.stringify(listNotis))
}

export function GetLocalNotifications() {
    let listNotis = []

    let notis = window.localStorage.getItem('noti')

    if (notis === undefined || notis === null) {
        window.localStorage.setItem('noti', JSON.stringify([{ 'status': 'not_notify' }]))
        notis = window.localStorage.getItem('noti')
    }

    listNotis = JSON.parse(notis)

    return listNotis;
}

export const ResetNotifications = () => {
    window.localStorage.setItem('noti', JSON.stringify([{ 'status': 'not_notify' }]))
}