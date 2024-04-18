import { create } from 'zustand'

export const useLivenessStore = create((set, get) => ({
  fullName: "",
  email: "",
  phone: "",
  address: "",
  dateBirth: "",
  imgBase64: null,
  confidenceLevel: "",
  setFullName: (state) => set({ fullName: state }),
  setEmail: (state) => set({ email: state }),
  setPhone: (state) => set({ phone: state }),
  setAddress: (state) => set({ address: state }),
  setDateBirth: (state) => set({ dateBirth: state }),
  setImgBase64: (state) => set({ imgBase64: state }),
  setConfidenceLevel: (state) => set({ confidenceLevel: state }),
}))

