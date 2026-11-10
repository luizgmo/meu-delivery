/*
 * SGBD: MySQL
 * 
 * Este arquivo contém uma massa de dados para testes.
 * 
 */
 
use delivery;
 

-- limpando tabelas
delete from pedido_item;
delete from pedido;
delete from cliente;
delete from prato;


-- pratos
insert into prato (id, descricao, preco) values (1, 'Marmita de frango', 22.50);
insert into prato (id, descricao, preco) values (2, 'Marmita de carne', 25.00);
insert into prato (id, descricao, preco) values (3, 'Marmita vegetariana', 20.00);
insert into prato (id, descricao, preco) values (4, 'Marmita de peixe', 28.00);

-- clientes
insert into cliente (id, nome, email) values (1, 'Juvenal Junqueira', 'juvenal@freemail.com');
insert into cliente (id, nome, email) values (2, 'Mário Martins', 'mario@freemail.com');
insert into cliente (id, nome, email) values (3, 'Norberto Nogueira', 'norberto@freemail.com');

-- pedido com itens
insert into pedido (id, cliente_id, dt_criacao) values (1, 1, now());
insert into pedido_item(id, pedido_id, prato_id, quantidade) values (1, 1, 1, 2);
insert into pedido_item(id, pedido_id, prato_id, quantidade) values (2, 1, 2, 1);
insert into pedido_item(id, pedido_id, prato_id, quantidade) values (3, 1, 3, 3);
