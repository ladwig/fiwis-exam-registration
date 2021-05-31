import { render } from '@testing-library/vue'
import DisplayClock from '@/components/DisplayClock.vue'

test('shows current time', async () => {

  const { findByText } = render(DisplayClock)
  const date = new Date()
  const time = date.getHours() + ":" + date.getMinutes()

  await findByText(time, {exact: false})

})
