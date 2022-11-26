# Upload Button

## Testing

During testing, it is enough to upload to the input element (use
`getInputElement`, from `./test-utils.ts`) to trigger `onChange`

```ts
it('onChange triggered', async () => {
  const user = userEvent.setup();
  const file = new File(['hello'], 'test.png');
  const onChange = jest.fn();

  render(<UploadButton onChange={onChange}>Upload Test</UploadButton>);

  await act(async () => {
    await user.upload(getInputElement(), file);
  });

  expect(onChange).toHaveBeenCalledWith(file);
});
```
