import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MultiStepForm from '../src/components/form/MultiStepForm';


describe('MultiStepForm', () => {

  test('renders learn react link', () => {
    render(<App />);
    const linkElement = screen.getByText((content, element) => {
      const hasText = (text) => text.match(/learn react/i);
      return hasText(content);
    });
    expect(linkElement).toBeInTheDocument();
  });
  
  test('renders the form', () => {
    render(<MultiStepForm />);

    expect(screen.getByText((content, element) => {
      const hasText = (text) => element.textContent.toLowerCase().includes(text.toLowerCase());
      return hasText('Formulário') && hasText('Dinâmico');
    })).toBeInTheDocument();
    
    // Verifica se o título do formulário é exibido
    expect(screen.getByText('Formulário Dinâmico')).toBeInTheDocument();

    // Verifica se os elementos iniciais estão presentes no formulário
    expect(screen.getByLabelText('Intervalo de datas:')).toBeInTheDocument();
    expect(screen.getByLabelText('Tipo de valor:')).toBeInTheDocument();
    expect(screen.getByLabelText('Valor:')).toBeInTheDocument();

    // Verifica se o botão "Adicionar linha" está presente
    expect(screen.getByText('Adicionar linha')).toBeInTheDocument();
  });

  test('adds a new row when "Adicionar linha" button is clicked', () => {
    render(<MultiStepForm />);
    
    // Verifica se existe apenas uma linha inicial no formulário
    expect(screen.getAllByLabelText('Intervalo de datas:')).toHaveLength(1);

    // Clica no botão "Adicionar linha"
    fireEvent.click(screen.getByText('Adicionar linha'));

    // Verifica se uma nova linha foi adicionada
    expect(screen.getAllByLabelText('Intervalo de datas:')).toHaveLength(2);
  });

  test('removes a row when "Remover" button is clicked', () => {
    render(<MultiStepForm />);
    
    // Clica no botão "Adicionar linha" duas vezes
    fireEvent.click(screen.getByText('Adicionar linha'));
    fireEvent.click(screen.getByText('Adicionar linha'));

    // Verifica se existem três linhas no formulário
    expect(screen.getAllByLabelText('Intervalo de datas:')).toHaveLength(3);

    // Clica no botão "Remover" da segunda linha
    fireEvent.click(screen.getAllByText('Remover')[1]);

    // Verifica se a segunda linha foi removida
    expect(screen.getAllByLabelText('Intervalo de datas:')).toHaveLength(2);
  });

  // Adicione aqui mais testes para as outras funcionalidades do componente MultiStepForm
});
