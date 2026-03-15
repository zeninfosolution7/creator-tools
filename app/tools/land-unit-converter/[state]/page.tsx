export async function generateStaticParams() {
  return Object.keys(landStates).map(state => ({
    state
  }))
}
