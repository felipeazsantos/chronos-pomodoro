import { Container } from '../../components/Container';
import { MainTemplate } from '../../templates/MainTemplate';

export function NotFound() {
  return (
    <MainTemplate>
      <Container>
        <h1>Página não encontrada</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi
          voluptatibus adipisci dolore assumenda suscipit debitis laudantium ea
          corporis nemo similique! Distinctio eius eligendi hic consectetur
          sint, est vitae possimus voluptates!
        </p>
      </Container>
    </MainTemplate>
  );
}
