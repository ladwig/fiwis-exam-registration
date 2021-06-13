import '@testing-library/jest-dom'
import { render, fireEvent } from '@testing-library/vue'
import SetExamRoom from '@/components/SetExamRoom.vue'
import { rooms } from '@/store/rooms.js'

function renderVuexComponent(customStore) {
  // Render the component and merge the original store and the custom one
  // provided as a parameter. This way, we can alter some behaviors of the
  // initial implementation.
  return render(SetExamRoom, {store: {...rooms, ...customStore}})
}

test('set a exam room and render corresponding view', async () => {

  const { getByText } = renderVuexComponent()

})
