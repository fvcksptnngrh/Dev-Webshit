export const namespaced = true

export const state = () => ({
  items: {}
})

export const getters = {
  getQty: s => id => s.items[id]?.qty || 0,
  totalItems: s => Object.values(s.items).reduce((sum, it) => sum + it.qty, 0),
  itemsList: s => Object.values(s.items),
  totalPrice: s => Object.values(s.items)
                   .reduce((sum, it) => sum + it.product.price * it.qty, 0)
}

export const mutations = {
  ADD_ITEM(s, p) {
    s.items = { ...s.items, [p.id]: { product: p, qty: 1 } }
  },
  INC(s, id) { s.items[id].qty++ },
  DEC(s, id) { s.items[id].qty-- },
  REMOVE(s, id) {
    const c = { ...s.items }
    delete c[id]
    s.items = c
  }
}

export const actions = {
  add({ state, commit }, p) {
    state.items[p.id] ? commit('INC', p.id) : commit('ADD_ITEM', p)
  },
  inc({ commit }, id) { commit('INC', id) },
  dec({ state, commit }, id) {
    if (!state.items[id]) return
    if (state.items[id].qty === 1) commit('REMOVE', id)
    else commit('DEC', id)
  }
}