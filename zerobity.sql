-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Oct 17, 2021 at 10:05 PM
-- Server version: 5.7.33
-- PHP Version: 7.4.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `zerobity`
--

-- --------------------------------------------------------

--
-- Table structure for table `alunos`
--

CREATE TABLE `alunos` (
  `id` int(11) NOT NULL,
  `nome` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `senha` varchar(16) NOT NULL,
  `cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `cpf` varchar(14) NOT NULL DEFAULT '000.000.000-00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `alunos`
--

INSERT INTO `alunos` (`id`, `nome`, `email`, `senha`, `cadastro`, `cpf`) VALUES
(1, 'Vinicius Trindade', 'vinitlima2007.14@gmail.com', 'senha', '2021-08-28 03:00:00', ''),
(3, 'Joao Moreira', 'moreira.joao@protonmail.com', 'senha', '2021-10-17 19:36:42', '000.000.000-00');

-- --------------------------------------------------------

--
-- Table structure for table `aulas_assistidas`
--

CREATE TABLE `aulas_assistidas` (
  `id` int(11) NOT NULL,
  `curso_id` tinyint(4) NOT NULL,
  `aula_id` int(11) NOT NULL,
  `aluno_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `aulas_assistidas`
--

INSERT INTO `aulas_assistidas` (`id`, `curso_id`, `aula_id`, `aluno_id`) VALUES
(24, 1, 1, 1),
(28, 1, 4, 1);

-- --------------------------------------------------------

--
-- Table structure for table `categorias`
--

CREATE TABLE `categorias` (
  `id` int(11) NOT NULL,
  `nome` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `categorias`
--

INSERT INTO `categorias` (`id`, `nome`) VALUES
(1, 'Front-End'),
(2, 'Back-End'),
(3, 'Programação (Geral)'),
(4, 'Automação Web'),
(5, 'Desenvolvimento Mobile'),
(6, 'Design Profisional'),
(7, 'Day Trader'),
(8, 'E-Commerce'),
(9, 'Marketing Digital'),
(10, 'Frameworks Front-End'),
(11, 'Frameworks Back-End'),
(12, 'Outros Destaques');

-- --------------------------------------------------------

--
-- Table structure for table `certificados`
--

CREATE TABLE `certificados` (
  `id` int(11) NOT NULL,
  `curso_id` tinyint(4) NOT NULL,
  `aluno_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `conclusoes`
--

CREATE TABLE `conclusoes` (
  `id` int(11) NOT NULL,
  `curso_id` tinyint(4) NOT NULL,
  `aluno_id` int(11) NOT NULL,
  `data` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `conclusoes`
--

INSERT INTO `conclusoes` (`id`, `curso_id`, `aluno_id`, `data`) VALUES
(1, 1, 1, '2021-11-23 03:00:00'),
(2, 2, 1, '2021-09-25 03:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `controle_cursos`
--

CREATE TABLE `controle_cursos` (
  `id` int(11) NOT NULL,
  `aluno_id` int(11) NOT NULL,
  `curso_id` tinyint(4) NOT NULL,
  `adquirido` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `controle_cursos`
--

INSERT INTO `controle_cursos` (`id`, `aluno_id`, `curso_id`, `adquirido`) VALUES
(1, 1, 2, '2021-07-02 19:54:36'),
(2, 2, 4, '2021-09-14 22:21:18'),
(3, 1, 1, '2021-03-11 11:43:54');

-- --------------------------------------------------------

--
-- Table structure for table `cursos`
--

CREATE TABLE `cursos` (
  `id` tinyint(4) NOT NULL,
  `nome` varchar(50) NOT NULL,
  `descricao` text NOT NULL,
  `valor_ant` decimal(6,2) NOT NULL,
  `valor` decimal(6,2) NOT NULL,
  `imagem` varchar(255) NOT NULL,
  `categoria_id` tinyint(4) NOT NULL,
  `slug` varchar(70) NOT NULL,
  `carga` tinyint(4) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `cursos`
--

INSERT INTO `cursos` (`id`, `nome`, `descricao`, `valor_ant`, `valor`, `imagem`, `categoria_id`, `slug`, `carga`) VALUES
(1, 'Front-End Completo', 'Domine o necessário para se tornar um desenvolvedor Front-End completo! Com mais de 250 aulas e mais de 15 projetos práticos, você irá aprender do básico ao avançado das principais ferramentas Front-End e aprenderá a criar seus próprios designs!', '259.90', '199.90', 'exemplo.jpng', 1, 'frontend-completo', 120),
(2, 'PHP8 Completo', 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestiae quae maiores fuga culpa eius asperiores porro mollitia, minima nam odio ipsum officiis, vel fugiat. Voluptate libero explicabo corporis eius natus.', '219.90', '179.90', 'exemplo.jpng', 2, 'php8-completo', 98),
(3, 'Flutter Completo', 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestiae quae maiores fuga culpa eius asperiores porro mollitia, minima nam odio ipsum officiis, vel fugiat. Voluptate libero explicabo corporis eius natus.', '189.90', '159.90', 'exemplo.jpng', 5, 'flutter-completo', 0),
(4, 'Forex Completo', 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestiae quae maiores fuga culpa eius asperiores porro mollitia, minima nam odio ipsum officiis, vel fugiat. Voluptate libero explicabo corporis eius natus.', '379.90', '299.90', 'exemplo.jpng', 7, 'forex-completo', 0),
(5, 'NodeJS Completo', 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.Molestiae quae maiores fuga culpa eius asperiores porro mollitia, minima nam odio ipsum officiis, vel fugiat.Voluptate libero explicabo corporis eius natus.', '379.90', '229.90', 'exemplo.jpng', 2, 'nodejs-completo', 0),
(6, 'Opções Binarias Completo', 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.Molestiae quae maiores fuga culpa eius asperiores porro mollitia, minima nam odio ipsum officiis, vel fugiat.Voluptate libero explicabo corporis eius natus.', '379.90', '299.90', 'exemplo.jpng', 7, 'opcoes-binarias-completo', 0);

-- --------------------------------------------------------

--
-- Table structure for table `cursos_aulas`
--

CREATE TABLE `cursos_aulas` (
  `id` int(11) NOT NULL,
  `nome` varchar(50) NOT NULL,
  `link` varchar(50) NOT NULL,
  `modulo_id` tinyint(4) NOT NULL,
  `curso_id` tinyint(4) NOT NULL,
  `slug` varchar(70) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `cursos_aulas`
--

INSERT INTO `cursos_aulas` (`id`, `nome`, `link`, `modulo_id`, `curso_id`, `slug`) VALUES
(1, 'Conheça sua jornada', 'https://link.com/link', 1, 1, 'conheca-sua-jornada'),
(2, 'O que é o Front-End?', 'https://link.com/link', 1, 1, 'o-que-e-o-frontend'),
(3, 'aula1', 'https://link.com/link', 3, 2, 'aula1'),
(4, 'O que é o Back-End?', 'https://link.com/link', 1, 1, 'o-que-e-o-backend'),
(5, 'O que é o HTML5?', 'https://player.vimeo.com/video/627034282', 2, 1, 'o-que-e-o-html5');

-- --------------------------------------------------------

--
-- Table structure for table `cursos_modulos`
--

CREATE TABLE `cursos_modulos` (
  `id` int(11) NOT NULL,
  `nome` varchar(50) NOT NULL,
  `curso_id` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `cursos_modulos`
--

INSERT INTO `cursos_modulos` (`id`, `nome`, `curso_id`) VALUES
(1, 'Boas Vindas', 1),
(2, 'Conhecendo as Tecnologias', 1),
(3, 'Boas Vindas', 2),
(4, 'Conhecendo o Treinamento', 2);

-- --------------------------------------------------------

--
-- Table structure for table `instrutores`
--

CREATE TABLE `instrutores` (
  `id` int(11) NOT NULL,
  `nome` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `cpf` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `instrutores`
--

INSERT INTO `instrutores` (`id`, `nome`, `email`, `senha`, `cpf`) VALUES
(1, 'Vinícius Trindade', 'vinitlima2007.14@gmail.com', 'Pouvini1lima', '564.086.788-40'),
(2, 'Fabiano Henrique', 'hsofabi05@gmail.com', 'senha', '202.077.567-08');

-- --------------------------------------------------------

--
-- Table structure for table `instrutores_cursos`
--

CREATE TABLE `instrutores_cursos` (
  `id` int(11) NOT NULL,
  `instrutor_id` tinyint(4) NOT NULL,
  `curso_id` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `instrutores_cursos`
--

INSERT INTO `instrutores_cursos` (`id`, `instrutor_id`, `curso_id`) VALUES
(1, 1, 1),
(2, 2, 2),
(3, 1, 5),
(4, 2, 4);

-- --------------------------------------------------------

--
-- Table structure for table `tecnologias`
--

CREATE TABLE `tecnologias` (
  `id` int(11) NOT NULL,
  `nome` varchar(20) NOT NULL,
  `exemplos` varchar(30) NOT NULL,
  `imagem` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tecnologias`
--

INSERT INTO `tecnologias` (`id`, `nome`, `exemplos`, `imagem`) VALUES
(1, 'Front-End', 'HTML, CSS & JS', 'exemplo.jpg'),
(2, 'Back-End', 'PHP, NodeJS, VueJS', 'exemplo.jpg'),
(3, 'Programação', 'Java SE, C++, Python', 'exemplo.jpg'),
(4, 'Automação Web', 'Python, Java, C#', 'exemplo.jpg'),
(5, 'Mobile', 'React Native, Flutter', 'exemplo.jpg'),
(6, 'Design', 'Adobe, Figma, Canva', 'exemplo.jpg'),
(7, 'Data Science', 'Python', 'exemplo.jpg'),
(8, 'Trade', 'Forex, OB, B3', 'exemplo.jpg'),
(9, 'E-Commerce', 'ML, Shopee', 'exemplo.jpg'),
(10, 'Marketing Digital', 'IG, FB, YT e Google', 'exemplo.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `alunos`
--
ALTER TABLE `alunos`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `aulas_assistidas`
--
ALTER TABLE `aulas_assistidas`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `certificados`
--
ALTER TABLE `certificados`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `conclusoes`
--
ALTER TABLE `conclusoes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `controle_cursos`
--
ALTER TABLE `controle_cursos`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cursos`
--
ALTER TABLE `cursos`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cursos_aulas`
--
ALTER TABLE `cursos_aulas`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cursos_modulos`
--
ALTER TABLE `cursos_modulos`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `instrutores`
--
ALTER TABLE `instrutores`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `cpf` (`cpf`);

--
-- Indexes for table `instrutores_cursos`
--
ALTER TABLE `instrutores_cursos`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tecnologias`
--
ALTER TABLE `tecnologias`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `alunos`
--
ALTER TABLE `alunos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `aulas_assistidas`
--
ALTER TABLE `aulas_assistidas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `categorias`
--
ALTER TABLE `categorias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `certificados`
--
ALTER TABLE `certificados`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `conclusoes`
--
ALTER TABLE `conclusoes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `controle_cursos`
--
ALTER TABLE `controle_cursos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `cursos`
--
ALTER TABLE `cursos`
  MODIFY `id` tinyint(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `cursos_aulas`
--
ALTER TABLE `cursos_aulas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `cursos_modulos`
--
ALTER TABLE `cursos_modulos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `instrutores`
--
ALTER TABLE `instrutores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `instrutores_cursos`
--
ALTER TABLE `instrutores_cursos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tecnologias`
--
ALTER TABLE `tecnologias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
